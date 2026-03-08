import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { refreshTwitchAccessToken } from '@/lib/refreshToken';
import { FollowsResponseSchema, UsersResponseSchema } from '@/types';

const TWITCH_API_BASE = 'https://api.twitch.tv/helix';

function twitchError(where: string, res: Response, body: string, debug?: unknown) {
  const status = res.status;
  return NextResponse.json(
    { ok: false, where, status, body, debug },
    { status: status === 401 || status === 403 ? 401 : 502 },
  );
}

async function twitchFetch(url: URL, accessToken: string) {
  return fetch(url.toString(), {
    cache: 'no-store',
    headers: {
      'Client-Id': process.env['AUTH_TWITCH_ID']!,
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// トークンをフロントに出したくないのでRoute Handlerを使用
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    // GetFollowsで渡されたcookieを受け取る
    const cookieName = req.cookies.get('__Secure-authjs.session-token')
      ? '__Secure-authjs.session-token'
      : req.cookies.get('authjs.session-token')
        ? 'authjs.session-token'
        : undefined;

    // localとvercelでgetTokenで取得しに行くcookieの名前がずれるのでcookineNameを渡してあげる必要があった
    // なぜずれるかというと本番はhttpsだから。Auth.jsが`__Secure-`のプレフィックスを付けるから
    const token = await getToken({
      req,
      secret: process.env['NEXTAUTH_SECRET']!,
      ...(cookieName ? { cookieName } : {}),
    });

    if (!token) {
      return NextResponse.json(
        { ok: false, where: 'getToken', reason: 'no token (cookie missing/expired)' },
        { status: 401 },
      );
    }

    const loginUserId = token.twitchUserId;

    let accessToken = token.twitchAccessToken;
    let refreshToken = token.twitchRefreshToken;
    const expires = token.twitchAccessTokenExpires;

    const isExpired = typeof expires !== 'number' || Date.now() >= expires - 60_000;

    if (isExpired) {
      if (refreshToken == null) {
        return NextResponse.json(
          { ok: false, where: 'refresh', reason: 'missing refresh token' },
          { status: 401 },
        );
      }

      try {
        const refreshed = await refreshTwitchAccessToken(refreshToken);
        accessToken = refreshed.access_token;
        if (refreshed.refresh_token != null) {
          refreshToken = refreshed.refresh_token;
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ ok: false, where: 'refresh', message }, { status: 401 });
      }
    }

    if (loginUserId == null || accessToken == null) {
      return NextResponse.json(
        {
          ok: false,
          where: 'loginUserId/accessToken',
          reason: 'missing twitchUserId/twitchAccessToken',
        },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const first = searchParams.get('first');
    const after = searchParams.get('after');

    const followsUrl = new URL(`${TWITCH_API_BASE}/channels/followed`);
    // const url = new URL('https://api.twitch.tv/helix/streams/followed'); // 配信中のチャンネル一覧
    followsUrl.searchParams.set('user_id', loginUserId);
    if (first != null) followsUrl.searchParams.set('first', String(Math.min(parseInt(first), 100)));
    if (after != null) followsUrl.searchParams.set('after', after);

    let followsRes = await twitchFetch(followsUrl, accessToken);

    if (followsRes.status === 401 && refreshToken != null) {
      try {
        const refreshed = await refreshTwitchAccessToken(refreshToken);
        accessToken = refreshed.access_token;
        followsRes = await twitchFetch(followsUrl, accessToken);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ ok: false, where: 'refresh-retry', message }, { status: 401 });
      }
    }

    if (!followsRes.ok) {
      const body = await followsRes.text();
      const hasRefresh = token.twitchRefreshToken != null ? true : false;
      const expires = token.twitchAccessTokenExpires;
      const now = Date.now();
      const diffMs = expires != null ? expires - now : null;
      const debug = { now, expires, hasRefresh, diffMs, cookieName };
      return twitchError('twitch:channels/followed', followsRes, body, debug);
    }

    const follows = FollowsResponseSchema.parse(await followsRes.json());

    if (follows.data.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const usersUrl = new URL(`${TWITCH_API_BASE}/users`);
    for (const f of follows.data) usersUrl.searchParams.append('id', f.broadcaster_id);

    const usersRes = await twitchFetch(usersUrl, accessToken);
    if (!usersRes.ok) {
      const body = await usersRes.text();
      return twitchError('twitch:users', usersRes, body);
    }

    const users = UsersResponseSchema.parse(await usersRes.json());
    const userById = new Map(users.data.map((u) => [u.id, u] as const));

    const data = follows.data
      .map((f) => {
        const u = userById.get(f.broadcaster_id);
        if (!u) return;
        return {
          id: u.id,
          display_name: u.display_name,
          login: u.login,
          profile_image_url: u.profile_image_url,
          offline_image_url: u.offline_image_url,
          followed_at: f.followed_at,
        };
      })
      .filter((x) => x != null);

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, where: 'server', message }, { status: 500 });
  }
};

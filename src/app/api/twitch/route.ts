import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

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
    // なぜずれるかというと本番はhttpsだからAuth.jsが`__Secure-`のプレフィックスを付けるから
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

    const userId = token?.twitchUserId;
    const accessToken = token?.twitchAccessToken;

    if (userId == null || accessToken == null) {
      return NextResponse.json(
        { ok: false, where: 'token', reason: 'missing twitchUserId/twitchAccessToken' },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const first = searchParams.get('first');
    const after = searchParams.get('after');

    const url = new URL('https://api.twitch.tv/helix/channels/followed');
    url.searchParams.set('user_id', userId);
    if (first != null && first !== '') url.searchParams.set('first', first);
    if (after != null && after !== '') url.searchParams.set('after', after);

    const res = await fetch(url.toString(), {
      headers: {
        'Client-Id': process.env['AUTH_TWITCH_ID']!,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const body = await res.text();

      const status = res.status;
      return NextResponse.json(
        { ok: false, where: 'twitch', status, body },
        { status: status === 401 || status === 403 ? 401 : 502 },
      );
    }

    const raw = await res.json();
    // return await res.json();

    return NextResponse.json(raw, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, where: 'server', message }, { status: 500 });
  }
};

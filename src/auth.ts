import NextAuth from 'next-auth';
import Twitch from 'next-auth/providers/twitch';

const TOKEN_REFRESH_BUFFER_MS = 60000;

async function refreshTwitchAccessToken(refreshToken: string) {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: process.env['AUTH_TWITCH_ID']!,
    client_secret: process.env['AUTH_TWITCH_SECRET']!,
  });

  const res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));

  return json as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Twitch({
      authorization: {
        params: {
          scope: 'openid user:read:email user:read:follows',
        },
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account }) {
      // サインイン直後だけ account が来る
      if (account?.provider === 'twitch') {
        token.twitchUserId = account.providerAccountId;
        token.twitchAccessToken = account.access_token as string;
        token.twitchRefreshToken = account.refresh_token;

        // expires_at(秒, いつ切れるか) or expires_in(秒、あと何秒で切れるか)
        // Date.now()がms単位かつ公式サンプルがmsなのでms合わせる
        const expiresMs =
          account.expires_at != null && account.expires_at
            ? account.expires_at * 1000
            : Date.now() + (account.expires_in ?? 0) * 1000;
        token.twitchAccessTokenExpires = expiresMs;

        return token;
      }

      // 期限が残っているならそのまま（TOKEN_REFRESH_BUFFER_MSミリ秒前までは許容）
      if (
        token.twitchAccessToken != null &&
        typeof token.twitchAccessTokenExpires === 'number' &&
        Date.now() < token.twitchAccessTokenExpires - TOKEN_REFRESH_BUFFER_MS
      ) {
        token.twitchError = 'RefreshFailed';
        return token;
      }

      // refresh token が無いなら更新しない
      if (token.twitchRefreshToken == null) {
        token.twitchError = 'RefreshFailed';
        return token;
      }

      // 上のif文に捕まらなかった、つまり期限切れ/間近ならトークンをリフレッシュ
      try {
        const refreshed = await refreshTwitchAccessToken(token['twitchRefreshToken']);
        token.twitchAccessToken = refreshed.access_token;
        token.twitchAccessTokenExpires = Date.now() + refreshed.expires_in * 1000;
        token.twitchError = undefined;
      } catch {
        token.twitchError = 'RefreshFailed';
      }

      // ここで返したtokenが下のsessionの引数のtokenとして使われる
      return token;
    },

    session({ token, session }) {
      session.user.id = token['twitchUserId'] as string;
      session.twitchError = token['twitchError'];
      return session;
    },
  },
});

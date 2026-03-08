import NextAuth from 'next-auth';
import Twitch from 'next-auth/providers/twitch';

import { TOKEN_REFRESH_BUFFER_MS } from './constants';
import { refreshTwitchAccessToken } from './lib/refreshToken';

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
      if (account?.provider === 'twitch') {
        token.twitchUserId = account.providerAccountId;
        token.twitchAccessToken = account.access_token as string;
        token.twitchRefreshToken = account.refresh_token!;

        // expires_at(秒, いつ切れるか) or expires_in(秒、あと何秒で切れるか)
        // Date.now()がms単位かつ公式サンプルがmsなのでmsに合わせる
        const expiresMs =
          account.expires_at != null && account.expires_at
            ? account.expires_at * 1000
            : Date.now() + (account.expires_in ?? 0) * 1000;
        token.twitchAccessTokenExpires = expiresMs;
        token.twitchError = undefined;

        return token;
      }

      // 期限が残っているならそのまま（TOKEN_REFRESH_BUFFER_MSミリ秒前までは許容）
      if (
        token.twitchAccessToken != null &&
        typeof token.twitchAccessTokenExpires === 'number' &&
        Date.now() < token.twitchAccessTokenExpires - TOKEN_REFRESH_BUFFER_MS
      ) {
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
        if (refreshed.refresh_token != null) {
          token.twitchRefreshToken = refreshed.refresh_token;
        }
      } catch (err) {
        console.error('Failed to refresh Twitch token', err);
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

import NextAuth from 'next-auth';
import Twitch from 'next-auth/providers/twitch';

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
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, account }) {
      // サインイン直後だけ account が来る
      if (account?.provider === 'twitch') {
        token['twitchUserId'] = account.providerAccountId;
        token['twitchAccessToken'] = account.access_token; // 後でAPI叩くなら保持
      }
      return token;
    },

    session({ token, session }) {
      session.user.id = token['twitchUserId'] as string;
      session.user.token = token['twitchAccessToken'] as string;
      return session;
    },
  },
});

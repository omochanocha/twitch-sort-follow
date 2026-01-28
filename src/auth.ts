import NextAuth from 'next-auth';
import Twitch from 'next-auth/providers/twitch';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Twitch],
  // callbacks: {
  // jwt({ token, account }) {
  //   if (account) {
  //     token['accessToken'] = account.access_token;
  //   }
  //   return token;
  // },
  // session({ session, token }) {
  //   session.sessionToken = typeof token['accessToken'] === 'string' ? token['accessToken'] : '';
  //   return session;
  // },
  // jwt({ token, account, trigger }) {
  //   // このtriggerは何？
  //   if (trigger === 'signIn' && account?.access_token != null) {
  //     token['accessToken'] = account.access_token;
  //   }
  //   return token;
  // },
  // session({ session, token }) {
  //   // token から値を取得して session に設定
  //   session.accessToken = typeof token['accessToken'] === 'string' ? token['accessToken'] : '';
  //   return session;
  // },
  // session({ token, session }) {
  //   // if (token) {
  //   //   session.user.id = token.id;
  //   // }
  //   return session;
  // },
  // },
});

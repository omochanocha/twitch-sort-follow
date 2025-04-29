import NextAuth from 'next-auth';
import Twitch from 'next-auth/providers/twitch';

// if (process.env['AUTH_TWITCH_ID'] == null || process.env['AUTH_TWITCH_SECRET'] == null) {
//   throw new Error('AUTH_TWITCH_ID or AUTH_TWITCH_SECRET is not defined');
// }

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    // user: {
    //   /** The user's postal address. */
    //   accessToken: string;
    //   /**
    //    * By default, TypeScript merges new interface properties and overwrites existing ones.
    //    * In this case, the default session user properties will be overwritten,
    //    * with the new ones defined above. To keep the default session user properties,
    //    * you need to add them back into the newly declared interface.
    //    */
    // } & DefaultSession['user'];
    accessToken: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // providers: [
  //   TwitchProvider({
  //     clientId: process.env['AUTH_TWITCH_ID'],
  //     clientSecret: process.env['AUTH_TWITCH_SECRET'],
  //   }),
  // ],
  providers: [Twitch],
  callbacks: {
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

    jwt({ token, account, trigger }) {
      // このtriggerは何？
      if (trigger === 'signIn' && account?.access_token != null) {
        token['accessToken'] = account.access_token;
      }
      return token;
    },
    session({ session, token }) {
      // token から値を取得して session に設定
      session.accessToken = typeof token['accessToken'] === 'string' ? token['accessToken'] : '';
      return session;
    },
  },
});

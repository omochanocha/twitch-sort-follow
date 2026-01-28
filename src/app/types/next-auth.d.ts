import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession['user'] & {
      // 追加の型定義を書ける
      id: string;
      token: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    };
    // accessToken?: string;
    // user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    // accessToken?: string;
    twitchUserId?: string;
    twitchAccessToken?: string;
  }
}

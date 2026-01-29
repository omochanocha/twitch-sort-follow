import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      // 追加の型定義を書ける
      id: string;
      token: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    twitchUserId?: string;
    twitchAccessToken?: string;
  }
}

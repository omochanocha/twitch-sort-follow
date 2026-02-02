'use client';

import { useEffect } from 'react';

import { signOut, useSession } from 'next-auth/react';

export const AutoRefreshSession = (): null => {
  const { data: session, update } = useSession();

  // 5分毎に更新
  // useEffect(() => {
  //   const id = setInterval(() => update(), 5 * TOKEN_REFRESH_BUFFER_MS);
  //   return () => clearInterval(id);
  // }, [update]);

  // refresh失敗したら自動サインアウト（任意）
  useEffect(() => {
    if (session?.twitchError === 'RefreshFailed') {
      void signOut({ redirectTo: '/login' });
    }
  }, [session]);

  return null;
};

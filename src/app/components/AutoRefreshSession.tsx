'use client';

import { useEffect } from 'react';

import { signOut, useSession } from 'next-auth/react';

export const AutoRefreshSession = (): null => {
  const { data, update } = useSession();

  useEffect(() => {
    const id = setInterval(() => update(), 5 * 60_000);
    return () => clearInterval(id);
  }, [update]);

  // refresh失敗したら自動サインアウト（任意）
  useEffect(() => {
    if (data?.twitchError === 'RefreshFailed') {
      void signOut({ redirectTo: '/login' });
    }
  }, [data]);

  return null;
};

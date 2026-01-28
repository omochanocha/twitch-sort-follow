'use client';

import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

export const ShowId: React.FC = () => {
  const session = useSession();

  // console.log(session.data?.user);

  const userId = session.data?.user.id;
  const accessToken = session.data?.user.token;

  useEffect(() => {
    const getUserId = async () => {
      try {
        console.log('follows取得開始');

        const response = await fetch(
          `https://api.twitch.tv/helix/channels/followed?user_id=${userId}`,
          {
            headers: {
              'Client-Id': process.env['AUTH_TWITCH_ID']!,
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error('レスポンス取得に失敗しました');
        }
        console.log('follows取得成功');

        // const data = await response.json();

        console.log(response.json());
      } catch (error) {
        console.error('Failed to fetch userId', error);
      }
    };
    void getUserId();
  }, [accessToken, userId]);

  return (
    <div>
      <p>clientコンポーネントで取得したsession</p>
      <p>{session.data?.user.name}</p>
    </div>
  );
};

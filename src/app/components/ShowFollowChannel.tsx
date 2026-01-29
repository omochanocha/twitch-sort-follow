'use client';

import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

export const ShowFollowChannel: React.FC = () => {
  const session = useSession();

  const userId = session.data?.user.id;
  const accessToken = session.data?.user.token;

  useEffect(() => {
    const getUserId = async () => {
      if (userId == null || accessToken == null) return;

      try {
        console.log('follows取得開始');

        const response = await fetch(
          `https://api.twitch.tv/helix/channels/followed?user_id=${encodeURIComponent(userId)}`,
          {
            headers: {
              'Client-Id': process.env['NEXT_PUBLIC_AUTH_TWITCH_ID']!,
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!response.ok) {
          const body = await response.text().catch(() => '');
          throw new Error(`Twitch API error: ${response.status} ${response.statusText} ${body}`);
        }
        console.log('follows取得成功');

        // const data = await response.json();

        console.log(await response.json());
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

import { cookies } from 'next/headers';

import { FollowsResponseSchema } from '../types';

export const GetFollows: React.FC<{ after: string }> = async ({ after = '' }) => {
  // route handler側でsession情報が取れないのでcookieを渡す
  const cookieHeader = (await cookies())
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const res = await fetch(`http://localhost:3000/api/twitch?after=${after}`, {
    headers: {
      cookie: cookieHeader,
    },
  });

  // ログイン後じゃないとだめ
  const raw = await res.json();
  console.log(raw);
  const data = FollowsResponseSchema.parse(raw);

  return (
    <div>
      <div>
        {data.data.map((user) => (
          <div key={user.broadcaster_id}>
            <a
              href={`https://www.twitch.tv/${user.broadcaster_login}`}
              target="_blank"
              rel="noreferrer"
            >
              {user.broadcaster_name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

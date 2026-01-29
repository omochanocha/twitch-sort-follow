import { cookies } from 'next/headers';

import { FollowsResponseSchema } from '../types';

export const GetFollows: React.FC = async () => {
  // route handler側でsession情報が取れないのでcookieを渡す
  const cookieHeader = (await cookies())
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const res = await fetch('http://localhost:3000/api/twitch', {
    headers: {
      cookie: cookieHeader,
    },
  });

  // ログイン後じゃないとだめ
  const raw = await res.json();
  const data = FollowsResponseSchema.parse(raw);

  console.log(data);

  return (
    <div>
      <div></div>
    </div>
  );
};

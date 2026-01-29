import { cookies } from 'next/headers';

import { FollowsResponse, FollowsResponseSchema } from '../types';

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
  const json: unknown = await res.json();
  const data: FollowsResponse = FollowsResponseSchema.parse(json);

  console.log(data);

  return (
    <div>
      <div></div>
    </div>
  );
};

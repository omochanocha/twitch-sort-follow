import { cookies } from 'next/headers';

import { API_BASE_URL } from '../constants';
import { FollowsResponseSchema } from '../types';
import { ShowFollowChannel } from './ShowFollowChannel';

export const GetFollows: React.FC<{ after: string }> = async ({ after = '' }) => {
  // route handler側でsession情報が取れないのでcookieを渡す
  const cookieHeader = (await cookies())
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const url = new URL(`${API_BASE_URL}/api/twitch`);

  if (after != null && after !== '') {
    url.searchParams.set('after', after);
  }

  url.searchParams.set('first', '100');

  const res = await fetch(url.toString(), {
    headers: {
      cookie: cookieHeader,
    },
  });

  // ログイン後じゃないとだめ
  const raw = await res.json();
  const data = FollowsResponseSchema.parse(raw);

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(350px,100%),1fr))] gap-5">
      {data.data.map((channel) => (
        <ShowFollowChannel channel={channel} key={channel.broadcaster_id} />
      ))}
    </ul>
  );
};

import { cookies } from 'next/headers';

import { API_BASE_URL } from '../constants';
import { FollowsResponseSchema } from '../types';

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

  const res = await fetch(url.toString(), {
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

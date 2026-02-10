import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { API_BASE_URL } from '../constants';
import { FollowsResponseSchema } from '../types';
import { ShowFollowChannel } from './ShowFollowChannel';

export const GetFollows: React.FC<{ after: string }> = async ({ after = '' }) => {
  // route handler側でsession情報が取れないのでcookieを渡す
  const cookieHeader = (await cookies())
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; '); // joinは配列を文字列に変換する、その際引数に区切り文字を指定することができる(https://qiita.com/yasu-hoshi/items/f1189fd78e86dd402c6c)

  console.log(await cookies());

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
  if (!res.ok) {
    // raw.body や raw.reason をログに出す
    throw new Error(JSON.stringify(raw));
  }
  if (raw == null) {
    notFound();
  }
  const data = FollowsResponseSchema.parse(raw);
  const followChannel = data.data;

  return <ShowFollowChannel initialData={followChannel} />;
};

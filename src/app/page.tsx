// 'use client';

// import Image from 'next/image';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { auth } from '@/auth';

import { ConfirmLogin } from './components/ConfirmLogin';

// TODO ログインしたらユーザー名でtoken取得からやる
// ここのIDは認証で取得したOauth tokenに含まれるuser IDと一致していないとだめ
// const ID = '154677733'; // 自分

// const URL = 'https://api.twitch.tv/helix/users';
// const URL = `https://api.twitch.tv/helix/channels/followed?user_id=${ID}`;

export default async function Home(): Promise<React.JSX.Element> {
  // const params = useParams();
  // console.log(params);

  const session = await auth();

  // if (session == null || session.user == null) {
  //   return <p>セッションがnullです</p>;
  // }

  // useEffect(() => {
  //   if (location.hash) {
  //     //     // alert(location.hash);
  //     //     const hash = location.hash;
  //     //     console.log(hash);
  //     const token = location.hash.match(/access_token=(.*)&scope/); // 雑にトークンを切り出す
  //     if (!token) {
  //       throw new Error('tokenが取得できませんでした');
  //     }
  //     console.log(`token: ${token[1]}`);
  //     const method = 'GET';
  //     const headers = {
  //       'Client-ID': 'd7ebnwhqibw2l92licr4o8qfsydxsk',
  //       Authorization: `Bearer ${token[1]}`,
  //       user_id: '102631269',
  //     };
  //     fetch(URL, { method, headers })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         // alert(JSON.stringify(res, null, '  '));
  //         console.log(JSON.stringify(res, null, '  '));
  //       })
  //       .catch((err) => alert(err));
  //   }
  // }, []);

  return (
    <div className="grid min-h-screen place-content-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="flex flex-col items-center gap-[32px] sm:items-start">
        <ConfirmLogin />
        {session != null && session.user.image != null && (
          <Image src={session.user.image} width={40} height={40} alt="" />
        )}

        <Link href="/">HOME</Link>

        {/* <Link href="https://id.twitch.tv/oauth2/authorize?client_id=d7ebnwhqibw2l92licr4o8qfsydxsk&redirect_uri=http://localhost:3000&response_type=token&scope=user:read:email">
          twitch認証
        </Link> */}
        {/* <Link href="https://id.twitch.tv/oauth2/authorize?client_id=d7ebnwhqibw2l92licr4o8qfsydxsk&redirect_uri=http://localhost:3000&response_type=token&scope=user:read:follows">
          twitch認証2
        </Link> */}
        {/* <Link href="https://id.twitch.tv/oauth2/authorize?redirect_uri=http://localhost:3000&response_type=token&scope=user:read:follows">
          twitch認証3
        </Link> */}
      </main>
    </div>
  );
}

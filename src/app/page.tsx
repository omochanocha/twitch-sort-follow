import Image from 'next/image';
import Link from 'next/link';

import { ConfirmLogin } from './components/ConfirmLogin';

// ここのIDは認証で取得したOauth tokenに含まれるuser IDと一致していないとだめ
// const ID = '154677733'; // 自分

// const URL = 'https://api.twitch.tv/helix/users';
// const URL = `https://api.twitch.tv/helix/channels/followed?user_id=${ID}`;

export default function Home(): React.JSX.Element {
  // const params = useParams();
  // console.log(params);

  // const session = auth();

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
  //       // user_id: '102631269',
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
    <div className="grid min-h-screen grid-rows-[1fr_1fr] place-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <ConfirmLogin />
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="flex h-10 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:w-auto sm:px-5 sm:text-base md:w-[158px] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
        <Link href="https://id.twitch.tv/oauth2/authorize?client_id=d7ebnwhqibw2l92licr4o8qfsydxsk&redirect_uri=http://localhost:3000&response_type=token&scope=user:read:email">
          twitch認証
        </Link>
        <Link href="https://id.twitch.tv/oauth2/authorize?client_id=d7ebnwhqibw2l92licr4o8qfsydxsk&redirect_uri=http://localhost:3000&response_type=token&scope=user:read:follows">
          twitch認証2
        </Link>
        <Link href="https://id.twitch.tv/oauth2/authorize?redirect_uri=http://localhost:3000&response_type=token&scope=user:read:follows">
          twitch認証3
        </Link>
        <Link href="/">HOME</Link>
      </main>
    </div>
  );
}

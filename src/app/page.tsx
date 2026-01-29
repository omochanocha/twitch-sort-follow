import React from 'react';

import Link from 'next/link';

import { ConfirmLogin } from './components/ConfirmLogin';

export default function Home(): React.JSX.Element {
  return (
    <div className="grid min-h-screen place-content-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="flex flex-col items-center gap-[32px] sm:items-start">
        <ConfirmLogin />
        {/* <GetFollows /> */}
        {/* {session != null && session.user.image != null && (
          <Image src={session.user.image} width={40} height={40} alt="" />
        )} */}
        <Link href="/">HOME</Link>
      </main>
    </div>
  );
}

import React from 'react';

import Link from 'next/link';

import { GetFollows } from './components/GetFollows';
import { SignOut } from './components/SignOut';

export default function Home(): React.JSX.Element {
  return (
    <div className="grid min-h-screen place-content-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="flex flex-col items-center gap-[32px] sm:items-start">
        {/* <ConfirmLogin /> */}
        <GetFollows after="" />
        <SignOut />
        <Link href="/">HOME</Link>
      </main>
    </div>
  );
}

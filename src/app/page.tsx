import React, { Suspense } from 'react';

import { CardSkeleton } from '../components/CardSkelton';
import { GetFollows } from '../components/GetFollows';

export default function Home(): React.JSX.Element {
  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={<CardSkeleton />}>
        <GetFollows after="" />
      </Suspense>
    </div>
  );
}

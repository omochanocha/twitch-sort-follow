import React, { Suspense } from 'react';

import { GetFollows } from '../components/GetFollows';

export default function Home(): React.JSX.Element {
  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={<h2>Loading...</h2>}>
        <GetFollows after="" />
      </Suspense>
    </div>
  );
}

import React from 'react';

import { GetFollows } from '../components/GetFollows';

export default function Home(): React.JSX.Element {
  return (
    <div className="container mx-auto">
      <GetFollows after="" />
    </div>
  );
}

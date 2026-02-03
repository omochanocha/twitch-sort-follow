'use client';

import { useState } from 'react';

import { FollowsChannel } from '../types';

export const ShowFollowChannel: React.FC = () => {
  const [followChannel, setFollowChannel] = useState<FollowsChannel[]>([]);
  return (
    <div>
      <p>clientコンポーネントで取得したsession</p>
    </div>
  );
};

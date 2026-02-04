import { FollowsChannel } from '@/types';

import { Card, CardTitle } from './ui/card';

export const ShowFollowChannel: React.FC<{ channel: FollowsChannel }> = ({ channel }) => {
  return (
    <li>
      <Card className="overflow-hidden rounded-3xl">
        <a
          href={`https://www.twitch.tv/${channel.broadcaster_login}`}
          target="_blank"
          rel="noreferrer"
          className="grid p-4 hover:opacity-50"
        >
          <CardTitle>{channel.broadcaster_name}</CardTitle>
        </a>
      </Card>
    </li>
  );
};

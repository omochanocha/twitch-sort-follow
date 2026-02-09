'use client';

import { useState } from 'react';

import { FollowsChannel } from '@/types';

import { Card, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

// TODO: URLパラメータでやる方法も考える

type SortKey = 'followd_desc' | 'followd_asc' | 'name_desc' | 'name_asc';

// Collatorを作るとオプションがDRYになる、あと何回も比較するのに毎回比較器（比較する環境的なもの？）を作らなくて良くなる
const collator = new Intl.Collator('ja', { numeric: true, sensitivity: 'base' });

export const ShowFollowChannel: React.FC<{ initialData: FollowsChannel[] }> = ({ initialData }) => {
  const [followChannel, setFollowChannel] = useState<FollowsChannel[]>(initialData);

  const getCompare = (sortKey: SortKey) => {
    switch (sortKey) {
      case 'followd_desc':
        return (a: FollowsChannel, b: FollowsChannel) => b.followed_at.localeCompare(a.followed_at);

      case 'followd_asc':
        return (a: FollowsChannel, b: FollowsChannel) => a.followed_at.localeCompare(b.followed_at);

      case 'name_desc':
        return (a: FollowsChannel, b: FollowsChannel) =>
          collator.compare(a.broadcaster_login, b.broadcaster_login);

      case 'name_asc':
        return (a: FollowsChannel, b: FollowsChannel) =>
          collator.compare(b.broadcaster_login, a.broadcaster_login);
    }
  };

  const handleOnChange = (e: SortKey) => {
    setFollowChannel((prev) => prev.toSorted(getCompare(e)));
  };

  return (
    <div className="grid gap-y-4">
      <Select onValueChange={(e: SortKey) => handleOnChange(e)}>
        <SelectTrigger className="w-1/2 sm:w-full sm:max-w-60">
          <SelectValue placeholder="並び替えオプション" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="followd_desc">フォローの新しい順</SelectItem>
            <SelectItem value="followd_asc">フォローの古い順</SelectItem>
            <SelectItem value="name_desc">アルファベット順</SelectItem>
            <SelectItem value="name_asc">アルファベット逆順</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(350px,100%),1fr))] gap-5">
        {followChannel.map((channel) => (
          <li key={channel.broadcaster_id}>
            <Card className="overflow-hidden rounded-3xl border-none dark:hover:bg-card/60">
              <a
                href={`https://www.twitch.tv/${channel.broadcaster_login}`}
                target="_blank"
                rel="noreferrer"
                className="grid p-4"
              >
                <CardTitle>{channel.broadcaster_name}</CardTitle>
              </a>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

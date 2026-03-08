'use client';

import { useState } from 'react';

import Image from 'next/image';

import { TwitchResponse, TwitchResponseList } from '@/types';

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

export const ShowFollowChannel: React.FC<{ initialData: TwitchResponseList }> = ({
  initialData,
}) => {
  const [followChannel, setFollowChannel] = useState<TwitchResponseList>(initialData);

  const getCompare = (sortKey: SortKey) => {
    switch (sortKey) {
      case 'followd_desc':
        return (a: TwitchResponse, b: TwitchResponse) => b.followed_at.localeCompare(a.followed_at);

      case 'followd_asc':
        return (a: TwitchResponse, b: TwitchResponse) => a.followed_at.localeCompare(b.followed_at);

      case 'name_desc':
        return (a: TwitchResponse, b: TwitchResponse) => collator.compare(a.login, b.login);

      case 'name_asc':
        return (a: TwitchResponse, b: TwitchResponse) => collator.compare(b.login, a.login);
    }
  };

  const handleOnChange = (e: SortKey) => {
    setFollowChannel((prev) => prev.toSorted(getCompare(e)));
  };

  if (initialData.length === 0) {
    return <h2 className="text-center text-xl">フォローしているチャンネルがいません</h2>;
  }

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
          <li key={channel.id}>
            <Card className="overflow-hidden rounded-3xl border-none hover:[&:not(:has(>a>img))]:bg-card/10 dark:hover:[&:not(:has(>a>img))]:bg-card/60">
              <a
                href={`https://www.twitch.tv/${channel.login}`}
                target="_blank"
                rel="noreferrer"
                className="group relative grid grid-cols-[max-content,1fr] items-center gap-x-3 p-4 backdrop-blur"
              >
                {/* {channel.offline_image_url && (
                  <Image
                    src={channel.offline_image_url ?? ''}
                    alt={channel.login}
                    width={800}
                    height={800}
                    className="absolute inset-0 size-full object-cover blur-sm transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                )} */}
                <div className="relative overflow-hidden rounded-full">
                  <Image
                    src={channel.profile_image_url}
                    alt={channel.login}
                    width={40}
                    height={40}
                  />
                </div>
                <CardTitle className="relative line-clamp-2 mix-blend-difference">
                  {channel.display_name}
                </CardTitle>
              </a>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

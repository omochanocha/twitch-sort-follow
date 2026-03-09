import React from 'react';

import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';

export const CardSkeleton = (): React.JSX.Element => {
  return (
    <div className="pt-4">
      <ul className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(350px,100%),1fr))] gap-5">
        {[...Array(4)].map((_, i) => (
          <CardSkeletonItem key={i} />
        ))}
      </ul>
    </div>
  );
};

const CardSkeletonItem = () => {
  return (
    <li>
      <Card className="rounded-3xl border-none">
        <div className="relative grid grid-cols-[max-content,1fr] items-center gap-x-3 p-4">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </Card>
    </li>
  );
};

import { siteConfig } from '@/config';

import { ModeToggle } from './ModeToggle';
import { SignOut } from './SignOut';

export const Header: React.FC = () => {
  return (
    <header className="h-14 bg-header shadow">
      <div className="flex h-full items-center justify-between px-4">
        <h1 className="text-lg font-bold">{siteConfig.name}</h1>
        <div className="flex items-center gap-4">
          <SignOut />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

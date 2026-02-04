import { auth } from '@/auth';
import { siteConfig } from '@/config';

import { ModeToggle } from './ModeToggle';
import { SignOut } from './SignOut';

export const Header: React.FC = async () => {
  const session = await auth();

  return (
    <header className="h-14 bg-header/10 shadow dark:bg-header">
      <div className="flex h-full items-center justify-between px-4">
        <h1 className="text-lg font-bold">{siteConfig.name}</h1>
        <div className="flex items-center gap-4">
          {session != null && <SignOut />}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

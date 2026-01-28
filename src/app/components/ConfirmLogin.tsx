import { auth } from '@/auth';

import { SignIn } from './SignIn';
import { SignOut } from './SignOut';

export const ConfirmLogin = async (): Promise<React.JSX.Element> => {
  const session = await auth();

  return (
    <div>
      {session != null ? (
        <div>
          <p>signed in as {session?.user?.name}</p>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <p>not singed in</p>
          <SignIn />
        </div>
      )}
      <SignOut />
    </div>
  );
};

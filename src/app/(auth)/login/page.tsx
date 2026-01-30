import { auth } from '@/auth';

import { SignIn } from '@/app/components/SignIn';
import { SignOut } from '@/app/components/SignOut';

export default async function LoginPage(): Promise<React.JSX.Element> {
  const session = await auth();

  return (
    <div>
      <div>loginページ</div>
      {session != null ? (
        <div>
          <p>signed in as {session?.user?.name}</p>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <SignOut />
        </div>
      ) : (
        <div>
          <p>not singed in</p>
          <SignIn />
        </div>
      )}
    </div>
  );
}

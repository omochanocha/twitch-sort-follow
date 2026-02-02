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

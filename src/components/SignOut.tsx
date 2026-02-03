import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';

export const SignOut = (): React.JSX.Element => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/login' });
      }}
    >
      <Button type="submit" variant={'secondary'} size={'lg'}>
        Sign Out
      </Button>
    </form>
  );
};

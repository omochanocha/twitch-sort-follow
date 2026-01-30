import { signOut } from '@/auth';

export const SignOut = (): React.JSX.Element => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/login' });
      }}
    >
      <button
        type="submit"
        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        Sign Out
      </button>
    </form>
  );
};

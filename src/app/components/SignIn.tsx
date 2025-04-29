import { signIn } from '@/auth';

export const SignIn = (): React.JSX.Element => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('twitch');
      }}
    >
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Sign in with Twitch
      </button>
    </form>
  );
};

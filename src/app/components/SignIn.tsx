import { signIn } from '@/auth';

export const SignIn = (): React.JSX.Element => {
  return (
    <form
      action={async () => {
        'use server';
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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

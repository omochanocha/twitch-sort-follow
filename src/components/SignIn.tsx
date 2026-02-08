import { signIn } from '@/auth';

import { Icon } from './Icon';
import { Button } from './ui/button';

export const SignIn = (): React.JSX.Element => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('twitch', { redirectTo: '/' });
      }}
    >
      <Button
        type="submit"
        variant={'secondary'}
        size={'default'}
        className="font-medium leading-relaxed tracking-wider [&_svg]:size-5"
      >
        <Icon.twitch className="" />
        SignIn
      </Button>
    </form>
  );
};

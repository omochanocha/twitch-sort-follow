import { SampleImg } from '@/components/SampleImg';
import { SignIn } from '@/components/SignIn';

export default function LoginPage(): React.JSX.Element {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 pb-9">
      <div className="grid gap-y-3 px-6">
        <p className="text-xl font-bold">ログイン後イメージ画像</p>
        <SampleImg />
      </div>
      <SignIn />
    </div>
  );
}

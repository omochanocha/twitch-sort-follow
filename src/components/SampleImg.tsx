import { getImageProps } from 'next/image';

export function SampleImg() {
  const common = { alt: 'ログイン後サンプル画像', width: 800, height: 600 };
  const {
    props: { srcSet: pc },
  } = getImageProps({ ...common, src: '/sample.png' });
  const {
    props: { srcSet: sp, ...rest },
  } = getImageProps({ ...common, src: '/sample_sp.png' });

  return (
    <picture>
      <source media="(width <= 768px)" srcSet={sp} />
      <source media="(width > 768px)" srcSet={pc} />
      <img {...rest} alt="ログイン後サンプル画像" />
    </picture>
  );
}

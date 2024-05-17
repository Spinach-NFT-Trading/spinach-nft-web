import {clsx} from 'clsx';

import {LayoutProps} from '@spinach/next/components/layout/type';


export const getLayoutClassNames = ({center, stretch, noFullWidth, className}: LayoutProps) => clsx(
  center && 'place-items-center content-center items-center justify-center text-center',
  stretch && 'self-stretch',
  !noFullWidth && 'w-full',
  className,
);

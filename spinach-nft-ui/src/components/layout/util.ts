import {clsx} from 'clsx';

import {LayoutProps} from '@spinach/next/components/layout/type';


export const getLayoutClassNames = ({center, stretch, noFullWidth, className}: LayoutProps) => clsx(
  center && 'place-content-center place-items-center text-center',
  stretch && 'self-stretch',
  !noFullWidth && 'w-full',
  className,
);

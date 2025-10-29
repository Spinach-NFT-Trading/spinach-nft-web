import React from 'react';

import {clsx} from 'clsx';

import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {getToggleButtonClass} from '@spinach/next/styles/input';


type Props = {
  href: string,
  text: string,
};

export const HomeSocialButton = ({href, text}: Props) => {
  return (
    <FlexLink href={href} className={clsx('w-32 border-2 p-2', getToggleButtonClass(false))}>
      {text}
    </FlexLink>
  );
};

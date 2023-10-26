import React from 'react';

import {FlexLink} from '@spinach/next/components/layout/flex/link';


type Props = {
  href: string,
  text: string,
};

export const HomeSocialButton = ({href, text}: Props) => {
  return (
    <FlexLink href={href} className="button-clickable w-32 border-2 border-slate-100 p-2 text-center">
      {text}
    </FlexLink>
  );
};

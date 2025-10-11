import React from 'react';

import {FlexButton} from '@spinach/next/components/layout/flex/button';


type Props = {
  onClick: () => void,
  children: React.ReactNode,
};

export const AdminMemberControlMenuButton = ({onClick, children}: Props) => {
  return (
    <FlexButton className="button-clickable-bg gap-1.5 p-2 text-xl grid-auto-width-80" center onClick={onClick}>
      {children}
    </FlexButton>
  );
};

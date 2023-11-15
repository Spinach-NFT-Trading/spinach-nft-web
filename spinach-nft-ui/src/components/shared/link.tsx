import React from 'react';

import {FlexLink} from '@spinach/next/components/layout/flex/link';


type Props = {
  link: string,
  text: string,
  icon: React.ReactNode,
};

export const TileLink = ({link, text, icon}: Props) => {
  return (
    <FlexLink href={link} center className="button-clickable-bg h-36 gap-2">
      <div className="h-9 w-9">
        {icon}
      </div>
      <div>{text}</div>
    </FlexLink>
  );
};

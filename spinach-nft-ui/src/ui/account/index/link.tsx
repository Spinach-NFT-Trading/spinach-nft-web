import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';

import {FlexLink} from '@spinach/next/components/layout/flex/link';


type Props = {
  link: string,
  text: string,
};

export const AccountInfoLink = ({link, text}: Props) => {
  return (
    <FlexLink href={link} center className="button-clickable-bg h-36 gap-2">
      <MagnifyingGlassIcon className="h-9 w-9"/>
      <div>{text}</div>
    </FlexLink>
  );
};

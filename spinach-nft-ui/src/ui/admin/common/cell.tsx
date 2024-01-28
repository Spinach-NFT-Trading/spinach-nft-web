import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';


type Props = {
  title: string,
  info: React.ReactNode,
  center?: boolean,
};

export const AdminMemberDataCell = ({title, info, center}: Props) => {
  return (
    <Flex noFullWidth className="gap-1">
      <Flex noFullWidth center={center ?? true} className="text-sm text-slate-400">
        {title}
      </Flex>
      <Flex noFullWidth center={center ?? true}>
        {info}
      </Flex>
    </Flex>
  );
};

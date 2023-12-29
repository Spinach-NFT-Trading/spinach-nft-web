import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';


type Props = {
  title: string,
  info: React.ReactNode,
};

export const AccountProfileCell = ({title, info}: Props) => {
  return (
    <Flex className="gap-1">
      <Flex className="text-slate-400">
        {title}
      </Flex>
      <Flex className="text-xl">
        {info}
      </Flex>
    </Flex>
  );
};

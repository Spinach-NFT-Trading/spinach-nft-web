import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';


type Props = {
  title: string,
  info: React.ReactNode,
};

export const AdminVerificationDataCell = ({title, info}: Props) => {
  return (
    <Flex className="gap-1">
      <Flex noFullWidth center className="text-slate-400">
        {title}
      </Flex>
      <Flex noFullWidth center className="text-xl">
        {info}
      </Flex>
    </Flex>
  );
};

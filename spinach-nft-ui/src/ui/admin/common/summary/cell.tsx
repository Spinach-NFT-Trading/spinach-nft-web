import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {formatInt} from '@spinach/next/utils/number/format/regular';


type Props = {
  title: string,
  value: number,
};

export const AdminMemberActivityCell = ({title, value}: Props) => {
  return (
    <Flex direction="row" className="info-section-bg items-center gap-1 rounded-lg p-2">
      <span className="whitespace-nowrap">{title}</span>
      <Flex direction="row" className="justify-end text-lg">
        {formatInt(value)}&nbsp;G
      </Flex>
    </Flex>
  );
};

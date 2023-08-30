import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex';
import {formatToAbbreviation} from '@spinach/next/utils/number';


type Props = {
  icon: React.ReactNode,
  value: number,
  title: string,
};

export const HomeStatsSection = ({icon, value, title}: Props) => {
  return (
    <Flex direction="row" noFullWidth className="w-56 gap-1.5 text-justify">
      <div className="relative h-10 w-10">
        {icon}
      </div>
      <Flex direction="col">
        <div className="text-2xl">
          {formatToAbbreviation({num: value})}
        </div>
        <div className="text-sm">
          {title}
        </div>
      </Flex>
    </Flex>
  );
};

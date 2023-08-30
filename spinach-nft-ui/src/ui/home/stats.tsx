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
    <Flex direction="row" noFullWidth className="gap-1.5 text-justify">
      <div className="relative h-14 w-14">
        {icon}
      </div>
      <Flex direction="col">
        <div className="text-3xl font-semibold">
          {formatToAbbreviation({num: value})}
        </div>
        <div className="text-slate-300">
          {title}
        </div>
      </Flex>
    </Flex>
  );
};

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
    <Flex direction="col">
      <Flex direction="row" center className="gap-1.5">
        <div className="relative h-10 w-10">
          {icon}
        </div>
        <div className="text-3xl font-semibold">
          {formatToAbbreviation({num: value})}
        </div>
      </Flex>
      <div className="text-slate-300">
        {title}
      </div>
    </Flex>
  );
};

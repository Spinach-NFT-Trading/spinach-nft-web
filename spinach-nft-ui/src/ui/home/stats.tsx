import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {formatToAbbreviation} from '@spinach/next/utils/number/format';


type Props = {
  icon: React.ReactNode,
  value: number,
  title: string,
};

export const HomeStatsSection = ({icon, value, title}: Props) => {
  return (
    <Flex>
      <Flex direction="row" center className="gap-1.5">
        <div className="relative size-10">
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

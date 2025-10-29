import React from 'react';

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {formatFloat2} from '@spinach/next/utils/number/format/regular';


type Props = {
  title: string,
  value?: number,
};

export const ProfileBalanceSection = ({title, value}: Props) => {
  return (
    <Flex className="gap-2">
      <Flex className="text-2xl">
        {title}
      </Flex>
      <Flex direction="row" center className="gap-2 text-3xl text-amber-400">
        <div className="relative size-10">
          <CurrencyDollarIcon/>
        </div>
        <div>
          {formatFloat2(value)}
        </div>
      </Flex>
    </Flex>
  );
};

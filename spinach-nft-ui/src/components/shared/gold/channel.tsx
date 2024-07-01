import React from 'react';

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import {GoldExchangeChannel} from '@spinach/common/types/data/gold/common';

import {UsdtIcon} from '@spinach/next/components/icons/usdt';
import {Flex} from '@spinach/next/components/layout/flex/common';


type Props = {
  channel: GoldExchangeChannel,
};

export const GoldExchangeChannelUi = ({channel}: Props) => {
  if (channel === 'crypto') {
    return (
      <Flex direction="row" className="gap-1">
        <div className="size-6">
          <UsdtIcon/>
        </div>
        <div>USDT</div>
      </Flex>
    );
  }

  if (channel === 'twBank') {
    return (
      <Flex direction="row" className="gap-1">
        <div className="size-6">
          <CurrencyDollarIcon/>
        </div>
        <div>台幣</div>
      </Flex>
    );
  }

  throw new Error(`Unhandled GOLD exchange channel [${channel satisfies never}]`);
};


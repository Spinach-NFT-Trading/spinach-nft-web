import React from 'react';

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import {GoldExchangeChannel} from '@spinach/common/types/data/gold/common';
import {useTranslations} from 'next-intl';

import {UsdtIcon} from '@spinach/next/components/icons/usdt';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {goldExchangeChannelI18nId} from '@spinach/next/const/gold';


type Props = {
  channel: GoldExchangeChannel,
};

export const GoldExchangeChannelUi = ({channel}: Props) => {
  const t = useTranslations('UI.Gold.ExchangeChannel');

  const name = t(goldExchangeChannelI18nId[channel]);

  if (channel === 'crypto') {
    return (
      <Flex direction="row" className="gap-1">
        <div className="size-6">
          <UsdtIcon/>
        </div>
        <div>{name}</div>
      </Flex>
    );
  }

  if (channel === 'twBank') {
    return (
      <Flex direction="row" className="gap-1">
        <div className="size-6">
          <CurrencyDollarIcon/>
        </div>
        <div>{name}</div>
      </Flex>
    );
  }

  throw new Error(`Unhandled GOLD exchange channel [${channel satisfies never}]`);
};


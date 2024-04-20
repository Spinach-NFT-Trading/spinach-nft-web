import React from 'react';

import {fxMarket} from '@spinach/common/const/fx';
import {getFxRate} from '@spinach/common/controller/actors/fx';
import {getGlobalConfig} from '@spinach/common/controller/actors/global';

import {PageLayout} from '@spinach/next/ui/base/layout/base/common';
import {GoldExchangeClient} from '@spinach/next/ui/gold/exchange/client';


export const GoldExchange = async () => {
  const [
    currentFx,
    globalConfig,
  ] = await Promise.all([
    getFxRate(fxMarket),
    getGlobalConfig(),
  ]);

  return (
    <PageLayout>
      <GoldExchangeClient
        usdtExchangeRate={parseFloat(currentFx || '0')}
        cashbackPercent={globalConfig.cashbackPercent}
      />
    </PageLayout>
  );
};

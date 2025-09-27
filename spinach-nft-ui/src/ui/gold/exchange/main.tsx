import React from 'react';

import {fxMarket} from '@spinach/common/const/fx';
import {getFxRate} from '@spinach/common/controller/actors/fx';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {PageLayout} from '@spinach/next/ui/base/layout/base/common';
import {GoldExchangeClient} from '@spinach/next/ui/gold/exchange/client';


export const GoldExchange = async () => {
  const [
    currentFx,
  ] = await Promise.all([
    getFxRate(fxMarket),
  ]);

  return (
    <PageLayout>
      <I18nProvider>
        <GoldExchangeClient usdtExchangeRate={parseFloat(currentFx || '0')}/>
      </I18nProvider>
    </PageLayout>
  );
};

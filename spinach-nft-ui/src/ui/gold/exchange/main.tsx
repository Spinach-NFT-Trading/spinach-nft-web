import React from 'react';

import {fxMarket} from '@spinach/common/const/fx';
import {getFxRate} from '@spinach/common/controller/common/fx';

import {PageLayout} from '@spinach/next/ui/base/layout/common';
import {GoldExchangeClient} from '@spinach/next/ui/gold/exchange/client';


export const GoldExchange = () => {
  const currentFx = React.use(getFxRate(fxMarket));

  return (
    <PageLayout>
      <GoldExchangeClient
        exchangeRate={parseFloat(currentFx || '0')}
        cashbackRate={0.1}
      />
    </PageLayout>
  );
};

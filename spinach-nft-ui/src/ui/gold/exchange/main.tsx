import React from 'react';

import {getFxRate} from '@spinach/next/controller/fx';
import {PageLayout} from '@spinach/next/ui/base/layout';
import {GoldExchangeClient} from '@spinach/next/ui/gold/exchange/client';


export const GoldExchange = () => {
  const currentFx = React.use(getFxRate({market: 'usdttwd'}));

  return (
    <PageLayout>
      <GoldExchangeClient exchangeRate={parseFloat(currentFx?.px || '0')} cashbackRate={0.1}/>
    </PageLayout>
  );
};

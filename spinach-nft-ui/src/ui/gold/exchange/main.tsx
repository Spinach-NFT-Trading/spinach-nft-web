import React from 'react';

import {PageLayout} from '@spinach/next/ui/base/layout';
import {GoldExchangeClient} from '@spinach/next/ui/gold/exchange/client';


export const GoldExchange = () => {
  return (
    <PageLayout>
      <GoldExchangeClient exchangeRate={31.2878} cashbackRate={0.1}/>
    </PageLayout>
  );
};

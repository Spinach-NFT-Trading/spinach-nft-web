import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@spinach/next/const/auth';
import {getFxRate} from '@spinach/next/controller/fx';
import {PageLayout} from '@spinach/next/ui/base/layout';
import {GoldExchangeClient} from '@spinach/next/ui/gold/exchange/client';


export const GoldExchange = () => {
  const session = React.use(getServerSession(authOptions));
  const currentFx = React.use(getFxRate({market: 'usdttwd'}));

  return (
    <PageLayout>
      <GoldExchangeClient
        session={session}
        exchangeRate={parseFloat(currentFx?.px || '0')}
        cashbackRate={0.1}
      />
    </PageLayout>
  );
};

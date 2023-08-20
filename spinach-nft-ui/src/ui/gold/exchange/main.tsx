import React from 'react';

import {fxMarket} from '@spinach/common/const/fx';
import {getFxRate} from '@spinach/common/controller/common/fx';
import {getServerSession} from 'next-auth';

import {authOptions} from '@spinach/next/const/auth';
import {AuthProvider} from '@spinach/next/contexts/auth';
import {PageLayout} from '@spinach/next/ui/base/layout/common';
import {GoldExchangeClient} from '@spinach/next/ui/gold/exchange/client';


export const GoldExchange = () => {
  const session = React.use(getServerSession(authOptions));
  const currentFx = React.use(getFxRate(fxMarket));

  return (
    <PageLayout>
      <AuthProvider>
        <GoldExchangeClient
          session={session}
          exchangeRate={parseFloat(currentFx || '0')}
          cashbackRate={0.1}
        />
      </AuthProvider>
    </PageLayout>
  );
};

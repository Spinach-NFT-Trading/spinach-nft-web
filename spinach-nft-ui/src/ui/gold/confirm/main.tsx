import React from 'react';

import {getServerSession} from 'next-auth';

import {Failed} from '@spinach/next/components/icons/failed';
import {Flex} from '@spinach/next/components/layout/flex';
import {authOptions} from '@spinach/next/const/auth';
import {getDepositWallet} from '@spinach/next/controller/gold';
import {PageLayout} from '@spinach/next/ui/base/layout/common';


export const GoldExchangeConfirm = () => {
  const session = React.use(getServerSession(authOptions));
  const wallet = React.use(getDepositWallet());

  if (!session) {
    return <Failed text="Session"/>;
  }

  if (!wallet) {
    return <Failed text="Deposit Wallet"/>;
  }

  return (
    <PageLayout>
      <Flex direction="col" center className="gap-2 md:p-10">
        <div>請將 USDT 匯入以下的錢包地址。</div>
        <pre className="info-section">{wallet.wallet}</pre>
      </Flex>
    </PageLayout>
  );
};

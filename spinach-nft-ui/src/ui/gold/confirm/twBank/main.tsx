import React from 'react';

import {NextPageProps} from '@spinach/next/types/next/page';
import {GoldExchangeConfirmLayout} from '@spinach/next/ui/gold/confirm/common/layout';
import {GoldExchangeConfirmPageParams} from '@spinach/next/ui/gold/confirm/common/type';
import {GoldExchangeConfirmTwBankClient} from '@spinach/next/ui/gold/confirm/twBank/client/main';


export const GoldExchangeConfirmTwBank = async ({searchParams}: NextPageProps<GoldExchangeConfirmPageParams>) => {
  const amount = typeof searchParams?.amount !== 'string' ? null : parseFloat(searchParams.amount);

  return (
    <GoldExchangeConfirmLayout channel="twBank" amount={amount}>
      {(wallet) => <GoldExchangeConfirmTwBankClient wallet={wallet} amount={amount}/>}
    </GoldExchangeConfirmLayout>
  );
};

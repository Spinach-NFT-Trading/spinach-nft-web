import React from 'react';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {GoldExchangeConfirmLayout} from '@spinach/next/ui/gold/confirm/common/layout';
import {GoldExchangeConfirmPageProps} from '@spinach/next/ui/gold/confirm/common/type';
import {GoldExchangeConfirmTwBankClient} from '@spinach/next/ui/gold/confirm/twBank/client/main';


export const GoldExchangeConfirmTwBank = async ({searchParams}: GoldExchangeConfirmPageProps) => {
  const amount = typeof searchParams?.amount !== 'string' ? null : parseFloat(searchParams.amount);

  return (
    <GoldExchangeConfirmLayout channel="twBank" amount={amount}>
      {(wallet) => (
        <I18nProvider>
          <GoldExchangeConfirmTwBankClient wallet={wallet} amount={amount}/>
        </I18nProvider>
      )}
    </GoldExchangeConfirmLayout>
  );
};

import React from 'react';

import {generateFileUploadGrant} from '@spinach/common/controller/actors/fileUpload';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {GoldExchangeConfirmLayout} from '@spinach/next/ui/gold/confirm/common/layout';
import {GoldExchangeConfirmPageProps} from '@spinach/next/ui/gold/confirm/common/type';
import {GoldExchangeConfirmTwBankClient} from '@spinach/next/ui/gold/confirm/twBank/client/main';


export const GoldExchangeConfirmTwBank = async ({searchParams}: GoldExchangeConfirmPageProps) => {
  const resolvedSearchParams = await searchParams;
  const amount = typeof resolvedSearchParams?.amount !== 'string' ? null : parseFloat(resolvedSearchParams.amount);

  const fileUploadGrantId = await generateFileUploadGrant();

  return (
    <GoldExchangeConfirmLayout channel="twBank" amount={amount}>
      {(wallet) => (
        <I18nProvider>
          <GoldExchangeConfirmTwBankClient wallet={wallet} amount={amount} fileUploadGrantId={fileUploadGrantId}/>
        </I18nProvider>
      )}
    </GoldExchangeConfirmLayout>
  );
};

'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {GoldExchangeConfirmTwBankLoadedClient} from '@spinach/next/ui/gold/confirm/twBank/client/loaded';
import {GoldExchangeConfirmTwBankClientCommonProps} from '@spinach/next/ui/gold/confirm/twBank/client/type';


export const GoldExchangeConfirmTwBankClient = (props: GoldExchangeConfirmTwBankClientCommonProps) => {
  const t = useTranslations('UI.Account.BankAccounts');

  return (
    <UserDataLazyLoad
      options={{
        type: 'verifiedBankDetails',
      }}
      loadingText={t('Name')}
      content={(data) => (
        <GoldExchangeConfirmTwBankLoadedClient
          verifiedBankDetails={data?.verifiedBankDetails ?? []}
          {...props}
        />
      )}
    />
  );
};

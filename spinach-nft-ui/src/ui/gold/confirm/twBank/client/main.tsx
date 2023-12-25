'use client';
import React from 'react';

import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {GoldExchangeConfirmTwBankLoadedClient} from '@spinach/next/ui/gold/confirm/twBank/client/loaded';
import {GoldExchangeConfirmTwBankClientCommonProps} from '@spinach/next/ui/gold/confirm/twBank/client/type';


export const GoldExchangeConfirmTwBankClient = (props: GoldExchangeConfirmTwBankClientCommonProps) => {
  return (
    <UserDataLazyLoad
      options={{
        type: 'verifiedBankDetails',
      }}
      loadingText="銀行帳號"
      content={(data) => (
        <GoldExchangeConfirmTwBankLoadedClient
          verifiedBankDetails={data?.verifiedBankDetails ?? []}
          {...props}
        />
      )}
    />
  );
};

'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AdminVerifyBankPending} from '@spinach/next/ui/admin/verify/bank/pending';


export const AdminVerifyBank = () => {
  return (
    <Flex className="gap-2">
      <div className="text-2xl">待驗證銀行帳號</div>
      <UserDataLazyLoad
        options={{
          type: 'adminUnverifiedBankDetails',
        }}
        loadingText="待驗證銀行帳號"
        content={(data) => {
          const response = data?.adminUnverifiedBankDetails;

          if (!response) {
            return null;
          }

          return <AdminVerifyBankPending data={response}/>;
        }}
      />
    </Flex>
  );
};

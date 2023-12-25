'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AdminVerifyGoldTxnPending} from '@spinach/next/ui/admin/verify/goldTxn/pending';


export const AdminVerifyGoldTxnClient = () => {
  return (
    <Flex className="gap-2">
      <div className="text-2xl">待驗證轉帳紀錄</div>
      <UserDataLazyLoad
        options={{
          type: 'adminUnverifiedGoldTxn',
        }}
        loadingText="待驗證轉帳紀錄"
        content={(data) => {
          const response = data?.adminUnverifiedGoldTxn;

          if (!response) {
            return null;
          }

          return <AdminVerifyGoldTxnPending data={response}/>;
        }}
      />
    </Flex>
  );
};

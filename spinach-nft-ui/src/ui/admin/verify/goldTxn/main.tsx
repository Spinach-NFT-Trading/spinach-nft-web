'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AdminDataSearchInputUi} from '@spinach/next/ui/admin/input/main';
import {adminVerifyGoldTxnSearchKeyName} from '@spinach/next/ui/admin/verify/goldTxn/const';
import {AdminVerifyGoldTxnResults} from '@spinach/next/ui/admin/verify/goldTxn/result';
import {
  adminVerifyGoldTxnFilterBasis,
  AdminVerifyGoldTxnFilterInput,
} from '@spinach/next/ui/admin/verify/goldTxn/type';


export const AdminVerifyGoldTxn = () => {
  const [input, setInput] = React.useState<AdminVerifyGoldTxnFilterInput>({
    key: 'username',
    value: '',
  });

  return (
    <Flex className="gap-2">
      <div className="text-2xl">待驗證 GOLD 購買紀錄</div>
      <AdminDataSearchInputUi
        input={input}
        setInput={setInput}
        availableSearchKeys={[...adminVerifyGoldTxnFilterBasis]}
        getSearchKeyName={(key) => adminVerifyGoldTxnSearchKeyName[key]}
      />
      <UserDataLazyLoad
        options={{
          type: 'adminUnverifiedGoldTxn',
        }}
        loadingText="待驗證 GOLD 購買紀錄"
        content={(data) => {
          const response = data?.adminUnverifiedGoldTxn;

          if (!response) {
            return null;
          }

          return <AdminVerifyGoldTxnResults data={response} input={input}/>;
        }}
      />
    </Flex>
  );
};

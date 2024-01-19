'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AdminDataSearchInputUi} from '@spinach/next/ui/admin/input/main';
import {adminVerifyBankSearchKeyName} from '@spinach/next/ui/admin/verify/bank/const';
import {AdminVerifyBankResults} from '@spinach/next/ui/admin/verify/bank/result';
import {adminVerifyBankFilterBasis, AdminVerifyBankFilterInput} from '@spinach/next/ui/admin/verify/bank/type';


export const AdminVerifyBank = () => {
  const [input, setInput] = React.useState<AdminVerifyBankFilterInput>({
    key: 'username',
    value: '',
  });

  return (
    <Flex className="gap-2">
      <div className="text-2xl">待驗證銀行帳號</div>
      <AdminDataSearchInputUi
        input={input}
        setInput={setInput}
        availableSearchKeys={[...adminVerifyBankFilterBasis]}
        getSearchKeyName={(key) => adminVerifyBankSearchKeyName[key]}
      />
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

          return <AdminVerifyBankResults data={response} input={input}/>;
        }}
      />
    </Flex>
  );
};

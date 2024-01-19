'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AdminDataSearchInputUi} from '@spinach/next/ui/admin/input/main';
import {adminVerifyIdSearchKeyName} from '@spinach/next/ui/admin/verify/id/const';
import {AdminVerifyIdResults} from '@spinach/next/ui/admin/verify/id/result';
import {adminVerifyIdFilterBasis, AdminVerifyIdFilterInput} from '@spinach/next/ui/admin/verify/id/type';


export const AdminVerifyId = () => {
  const [input, setInput] = React.useState<AdminVerifyIdFilterInput>({
    key: 'username',
    value: '',
  });

  return (
    <Flex className="gap-2">
      <div className="text-2xl">待驗證帳號</div>
      <AdminDataSearchInputUi
        input={input}
        setInput={setInput}
        availableSearchKeys={[...adminVerifyIdFilterBasis]}
        getSearchKeyName={(key) => adminVerifyIdSearchKeyName[key]}
      />
      <UserDataLazyLoad
        options={{
          type: 'adminUnverifiedAccounts',
        }}
        loadingText="待驗證帳號"
        content={(data) => {
          const response = data?.adminUnverifiedAccounts;

          if (!response) {
            return null;
          }

          return <AdminVerifyIdResults data={response} input={input}/>;
        }}
      />
    </Flex>
  );
};

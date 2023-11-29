'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AccountBankDetails} from '@spinach/next/ui/account/profile/sections/bank';
import {AccountProfileInfo} from '@spinach/next/ui/account/profile/sections/info';


export const AccountProfileClient = () => {
  return (
    <Flex className="gap-2">
      <UserDataLazyLoad
        options={{
          type: 'userInfo',
        }}
        loadingText="用戶資訊"
        content={(data) => (
          <AccountProfileInfo userInfo={data?.userInfo}/>
        )}
      />
      <UserDataLazyLoad
        options={{
          type: 'userBankDetails',
        }}
        loadingText="銀行帳號"
        content={(data) => (
          <AccountBankDetails bankDetails={data?.userBankDetails || []}/>
        )}
      />
    </Flex>
  );
};

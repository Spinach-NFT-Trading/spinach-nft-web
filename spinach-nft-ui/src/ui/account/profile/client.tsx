'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {AccountBankDetails} from '@spinach/next/ui/account/profile/sections/bank';
import {AccountProfileInfo} from '@spinach/next/ui/account/profile/sections/info';
import {AccountProfileCommonProps} from '@spinach/next/ui/account/profile/type';


export const AccountProfileClient = ({userInfo, bankDetails}: AccountProfileCommonProps) => {
  return (
    <Flex className="gap-2">
      <AccountProfileInfo userInfo={userInfo}/>
      <AccountBankDetails bankDetails={bankDetails}/>
    </Flex>
  );
};

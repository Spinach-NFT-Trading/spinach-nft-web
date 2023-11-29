import React from 'react';

import {UserInfo} from '@spinach/common/types/common/user';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {AccountProfileCell} from '@spinach/next/ui/account/profile/sections/common/cell';


type Props = {
  userInfo: UserInfo | undefined,
};

export const AccountProfileInfo = ({userInfo}: Props) => {
  if (!userInfo) {
    return <SignIn/>;
  }

  const {
    username,
    email,
    name,
    idNumber,
    birthday,
    lineId,
    wallet,
  } = userInfo;

  return (
    <Flex className="info-section gap-1 md:flex-row">
      <Flex className="gap-1">
        <AccountProfileCell title="用戶 ID" info={username}/>
        <AccountProfileCell title="Email" info={email}/>
        <AccountProfileCell title="LINE ID" info={lineId}/>
        <AccountProfileCell title="錢包地址" info={wallet}/>
      </Flex>
      <Flex className="gap-1">
        <AccountProfileCell title="姓名" info={name}/>
        <AccountProfileCell title="身份證字號" info={idNumber}/>
        <AccountProfileCell title="生日" info={birthday}/>
      </Flex>
    </Flex>
  );
};

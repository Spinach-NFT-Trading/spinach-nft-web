'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AdminMembersSearchInput} from '@spinach/next/ui/admin/members/input/main';
import {AdminMembersResults} from '@spinach/next/ui/admin/members/result/main';
import {AdminMembersFilterInput} from '@spinach/next/ui/admin/members/type';


type Props = {
  isAdmin: boolean,
};

export const AdminMembersClient = ({isAdmin}: Props) => {
  const [input, setInput] = React.useState<AdminMembersFilterInput>({
    idNumber: '',
    username: '',
    name: '',
    email: '',
    lineId: '',
    wallet: '',
    bankAccount: '',
  });

  return (
    <Flex className="gap-1.5">
      <AdminMembersSearchInput input={input} setInput={setInput}/>
      <UserDataLazyLoad
        options={{
          type: 'adminMemberList',
        }}
        loadingText="會員資料"
        content={(data) => {
          const response = data?.adminMemberList;

          if (!response) {
            return null;
          }

          return <AdminMembersResults isAdmin={isAdmin} input={input} memberInfo={response}/>;
        }}
      />
    </Flex>
  );
};

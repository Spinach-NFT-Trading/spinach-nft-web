'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AdminDataSearchInputUi} from '@spinach/next/ui/admin/input/main';
import {adminMembersSearchKeyName} from '@spinach/next/ui/admin/members/const';
import {AdminMembersResults} from '@spinach/next/ui/admin/members/result/main';
import {adminMembersFilterBasis, AdminMembersFilterInput} from '@spinach/next/ui/admin/members/type';


type Props = {
  isAdmin: boolean,
};

export const AdminMembers = ({isAdmin}: Props) => {
  const [input, setInput] = React.useState<AdminMembersFilterInput>({
    key: 'username',
    value: '',
  });

  return (
    <Flex className="gap-1.5">
      <div className="text-2xl">會員資訊</div>
      <AdminDataSearchInputUi
        input={input}
        setInput={setInput}
        availableSearchKeys={[...adminMembersFilterBasis]}
        getSearchKeyName={(key) => adminMembersSearchKeyName[key]}
      />
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

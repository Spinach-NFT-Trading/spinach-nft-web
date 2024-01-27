'use client';
import React from 'react';

import {toIsoUtcDateString} from '@spinach/common/utils/date';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminDataSearchInputUi} from '@spinach/next/ui/admin/input/main';
import {adminMembersSearchKeyName} from '@spinach/next/ui/admin/members/const';
import {useAdminLookBackInput} from '@spinach/next/ui/admin/members/result/common/lookback/hook';
import {AdminMemberDataLookBackInput} from '@spinach/next/ui/admin/members/result/common/lookback/main';
import {AdminMembersResults} from '@spinach/next/ui/admin/members/result/main';
import {adminMembersFilterBasis, AdminMembersFilterInput} from '@spinach/next/ui/admin/members/type';


type Props = {
  isAdmin: boolean,
};

export const AdminMembers = ({isAdmin}: Props) => {
  const todayDateStr = toIsoUtcDateString(new Date());
  const [input, setInput] = React.useState<AdminMembersFilterInput>({
    key: 'username',
    value: '',
  });
  const inputControl = useAdminLookBackInput({
    initialRequest: {
      startDate: todayDateStr,
      endDate: todayDateStr,
    },
    getDataLoadingOpts: (state) => ({
      type: 'adminMemberList',
      opts: state,
    }),
  });
  const {lazyLoaded} = inputControl;

  const response = lazyLoaded?.adminMemberList;

  return (
    <Flex className="gap-2">
      <div className="text-2xl">會員資訊</div>
      <AdminDataSearchInputUi
        input={input}
        setInput={setInput}
        availableSearchKeys={[...adminMembersFilterBasis]}
        getSearchKeyName={(key) => adminMembersSearchKeyName[key]}
      />
      <AdminMemberDataLookBackInput inputControl={inputControl}/>
      <AnimatedCollapse appear show={!!response}>
        {
          response &&
          <AdminMembersResults
            isAdmin={isAdmin}
            input={input}
            memberInfo={response}
            lookBackInputControl={inputControl}
          />
        }
      </AnimatedCollapse>
    </Flex>
  );
};

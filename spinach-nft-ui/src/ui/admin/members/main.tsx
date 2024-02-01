'use client';
import React from 'react';

import {isNotNullish} from '@spinach/common/utils/type';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminAgentName} from '@spinach/next/ui/admin/common/agent';
import {useAdminLookBackInput} from '@spinach/next/ui/admin/common/lookback/hook';
import {AdminMemberDataLookBackInput} from '@spinach/next/ui/admin/common/lookback/main';
import {generateDataLookBackRequestOfSameDay} from '@spinach/next/ui/admin/common/lookback/utils';
import {AdminMemberActivitySummary} from '@spinach/next/ui/admin/common/summary/main';
import {AgentIdContext} from '@spinach/next/ui/admin/context';
import {AdminDataSearchInputUi} from '@spinach/next/ui/admin/input/main';
import {adminMembersSearchKeyName} from '@spinach/next/ui/admin/members/const';
import {AdminMembersResults} from '@spinach/next/ui/admin/members/result/main';
import {adminMembersFilterBasis, AdminMembersFilterInput} from '@spinach/next/ui/admin/members/type';


type Props = {
  isAdmin: boolean,
};

export const AdminMembers = ({isAdmin}: Props) => {
  const agentId = React.useContext(AgentIdContext);
  const [input, setInput] = React.useState<AdminMembersFilterInput>({
    key: 'username',
    value: '',
  });
  const inputControl = useAdminLookBackInput({
    initialRequest: generateDataLookBackRequestOfSameDay(),
    getDataLoadingOpts: (state) => ({
      type: 'adminMemberList',
      opts: {...state, agentId},
    }),
  });
  const {lazyLoaded} = inputControl;

  const response = lazyLoaded?.adminMemberList;

  return (
    <Flex className="gap-2">
      <Flex direction="row" noFullWidth className="items-end gap-2">
        <span className="text-2xl">會員資訊</span>
        <AdminAgentName agent={response?.agent}/>
      </Flex>
      <AdminDataSearchInputUi
        input={input}
        setInput={setInput}
        availableSearchKeys={[...adminMembersFilterBasis]}
        getSearchKeyName={(key) => adminMembersSearchKeyName[key]}
      />
      <AdminMemberDataLookBackInput inputControl={inputControl}/>
      <AdminMemberActivitySummary
        activities={Object.values(response?.balanceActivityMap ?? []).filter(isNotNullish)}
      />
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

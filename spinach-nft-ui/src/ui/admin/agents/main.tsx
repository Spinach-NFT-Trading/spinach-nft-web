import React from 'react';

import {toIsoUtcDateString} from '@spinach/common/utils/date';
import {isNotNullish} from '@spinach/common/utils/type';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {adminAgentsSearchKeyName} from '@spinach/next/ui/admin/agents/const';
import {AdminAgentsResults} from '@spinach/next/ui/admin/agents/result/main';
import {adminAgentsFilterBasis, AdminAgentsFilterInput} from '@spinach/next/ui/admin/agents/type';
import {useAdminLookBackInput} from '@spinach/next/ui/admin/common/lookback/hook';
import {AdminMemberDataLookBackInput} from '@spinach/next/ui/admin/common/lookback/main';
import {AdminMemberActivitySummary} from '@spinach/next/ui/admin/common/summary/main';
import {AdminDataSearchInputUi} from '@spinach/next/ui/admin/input/main';


type Props = {
  onAgentSelected: (agentId: string | null) => void,
};

export const AdminMemberAgent = ({onAgentSelected}: Props) => {
  const todayDateStr = toIsoUtcDateString(new Date());
  const [input, setInput] = React.useState<AdminAgentsFilterInput>({
    key: 'username',
    value: '',
  });
  const inputControl = useAdminLookBackInput({
    initialRequest: {
      startDate: todayDateStr,
      endDate: todayDateStr,
    },
    getDataLoadingOpts: (state) => ({
      type: 'adminAgentList',
      opts: state,
    }),
  });
  const {lazyLoaded} = inputControl;

  const response = lazyLoaded?.adminAgentList;

  return (
    <Flex className="gap-2">
      <div className="text-2xl">代理一覽</div>
      <AdminDataSearchInputUi
        input={input}
        setInput={setInput}
        availableSearchKeys={[...adminAgentsFilterBasis]}
        getSearchKeyName={(key) => adminAgentsSearchKeyName[key]}
      />
      <AdminMemberDataLookBackInput inputControl={inputControl}/>
      <AdminMemberActivitySummary
        activities={Object.values(response?.balanceActivityMap ?? []).filter(isNotNullish)}
      />
      <AnimatedCollapse appear show={!!response}>
        {
          response &&
          <AdminAgentsResults
            input={input}
            data={response}
            lookBackInputControl={inputControl}
            onAgentSelected={onAgentSelected}
          />
        }
      </AnimatedCollapse>
    </Flex>
  );
};

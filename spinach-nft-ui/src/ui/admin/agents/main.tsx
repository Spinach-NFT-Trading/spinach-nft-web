import React from 'react';

import {isNotNullish} from '@spinach/common/utils/type';
import {useTranslations} from 'next-intl';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {CommonUserData} from '@spinach/next/types/auth';
import {adminAgentsSearchKeyName} from '@spinach/next/ui/admin/agents/const';
import {AdminAgentsResults} from '@spinach/next/ui/admin/agents/result/main';
import {adminAgentsFilterBasis, AdminAgentsFilterInput} from '@spinach/next/ui/admin/agents/type';
import {useAdminLookBackInput} from '@spinach/next/ui/admin/common/lookback/hook';
import {AdminMemberDataLookBackInput} from '@spinach/next/ui/admin/common/lookback/main';
import {generateDataLookBackRequestOfSameDay} from '@spinach/next/ui/admin/common/lookback/utils';
import {AdminMemberActivitySummary} from '@spinach/next/ui/admin/common/summary/main';
import {AdminDataSearchInputUi} from '@spinach/next/ui/admin/input/main';


type Props = {
  user: CommonUserData,
  onAgentSelected: (agentId: string | null) => void,
};

export const AdminMemberAgent = ({user, onAgentSelected}: Props) => {
  const [input, setInput] = React.useState<AdminAgentsFilterInput>({
    key: 'username',
    value: '',
  });
  const inputControl = useAdminLookBackInput({
    initialRequest: generateDataLookBackRequestOfSameDay(),
    getDataLoadingOpts: (state) => ({
      type: 'adminAgentList',
      opts: state,
    }),
  });
  const {lazyLoaded} = inputControl;

  const t = useTranslations('UI.InPage.Admin.Agents');

  const response = lazyLoaded?.adminAgentList;

  return (
    <Flex className="gap-2">
      <div className="text-2xl">{t('Title')}</div>
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
            actor={user}
            lookBackInputControl={inputControl}
            input={input}
            data={response}
            onAgentSelected={onAgentSelected}
          />
        }
      </AnimatedCollapse>
    </Flex>
  );
};

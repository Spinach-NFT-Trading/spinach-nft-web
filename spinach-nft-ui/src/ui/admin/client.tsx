'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {useTabbedContentControl} from '@spinach/next/components/layout/tab/hook';
import {TabbedContent} from '@spinach/next/components/layout/tab/main';
import {CommonUserData} from '@spinach/next/types/auth';
import {AdminMemberAgent} from '@spinach/next/ui/admin/agents/main';
import {adminTabsAdminOnly} from '@spinach/next/ui/admin/const';
import {AgentIdContext} from '@spinach/next/ui/admin/context';
import {AdminExchangeRequests} from '@spinach/next/ui/admin/exchangeRequests/main';
import {AdminGlobalConfigUi} from '@spinach/next/ui/admin/globalConfig/main';
import {AdminMembers} from '@spinach/next/ui/admin/members/main';
import {AdminPageTab, adminPageTabs} from '@spinach/next/ui/admin/type';
import {AdminVerifyBank} from '@spinach/next/ui/admin/verify/bank/main';
import {AdminVerifyGoldTxn} from '@spinach/next/ui/admin/verify/goldTxn/main';
import {AdminVerifyId} from '@spinach/next/ui/admin/verify/id/main';


type Props = {
  user: CommonUserData,
};

export const AdminPageClient = ({user}: Props) => {
  const [agentId, setAgentId] = React.useState<string | null>(null);
  const tabControl = useTabbedContentControl<AdminPageTab>(user ? 'agents' : 'members');

  const t = useTranslations('UI.InPage.Admin.Tabs');

  return (
    <AgentIdContext.Provider value={agentId}>
      <TabbedContent
        keys={[...adminPageTabs].filter((tab) => {
          if (adminTabsAdminOnly[tab]) {
            return user.isAdmin;
          }

          return true;
        })}
        control={tabControl}
        tabTitle={{
          agents: t('Agents'),
          members: t('Members'),
          exchangeRequests: t('ExchangeRequests'),
          verifyId: t('VerifyId'),
          verifyBankAccount: t('VerifyBankAccount'),
          verifyBankTxn: t('VerifyBankTxn'),
          globalConfig: t('GlobalConfig'),
        }}
        content={{
          agents: (
            user ?
              <AdminMemberAgent
                isAdmin={user.isAdmin}
                onAgentSelected={(agentId) => {
                  setAgentId(agentId);
                  tabControl.setCurrent('members');
                }}
              /> :
              null
          ),
          members: <AdminMembers user={user}/>,
          exchangeRequests: <AdminExchangeRequests/>,
          verifyId: <AdminVerifyId/>,
          verifyBankAccount: <AdminVerifyBank/>,
          verifyBankTxn: <AdminVerifyGoldTxn/>,
          globalConfig: <AdminGlobalConfigUi/>,
        }}
        getReactKey={(key) => key}
        classOfContents="p-2"
      />
    </AgentIdContext.Provider>
  );
};

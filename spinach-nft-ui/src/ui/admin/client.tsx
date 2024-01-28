'use client';
import React from 'react';

import {useTabbedContentControl} from '@spinach/next/components/layout/tab/hook';
import {TabbedContent} from '@spinach/next/components/layout/tab/main';
import {AdminMemberAgent} from '@spinach/next/ui/admin/agents/main';
import {adminTabsAdminOnly} from '@spinach/next/ui/admin/const';
import {AgentIdContext} from '@spinach/next/ui/admin/context';
import {AdminMembers} from '@spinach/next/ui/admin/members/main';
import {AdminPageTab, adminPageTabs} from '@spinach/next/ui/admin/type';
import {AdminVerifyBank} from '@spinach/next/ui/admin/verify/bank/main';
import {AdminVerifyGoldTxn} from '@spinach/next/ui/admin/verify/goldTxn/main';
import {AdminVerifyId} from '@spinach/next/ui/admin/verify/id/main';


type Props = {
  isAdmin: boolean,
};

export const AdminPageClient = ({isAdmin}: Props) => {
  const [agentId, setAgentId] = React.useState<string | null>(null);
  const tabControl = useTabbedContentControl<AdminPageTab>(isAdmin ? 'agents' : 'members');

  return (
    <AgentIdContext.Provider value={agentId}>
      <TabbedContent
        keys={[...adminPageTabs].filter((tab) => {
          if (adminTabsAdminOnly[tab]) {
            return isAdmin;
          }

          return true;
        })}
        control={tabControl}
        tabTitle={{
          agents: '代理列表',
          members: '會員列表',
          verifyId: '驗證身分',
          verifyBankAccount: '驗證銀行帳號',
          verifyBankTxn: '驗證 GOLD 購買紀錄',
        }}
        content={{
          agents: isAdmin ? <AdminMemberAgent onAgentSelected={(agentId) => {
            setAgentId(agentId);
            tabControl.setCurrent('members');
          }}/> : null,
          members: <AdminMembers isAdmin={isAdmin}/>,
          verifyId: isAdmin ? <AdminVerifyId/> : null,
          verifyBankAccount: isAdmin ? <AdminVerifyBank/> : null,
          verifyBankTxn: isAdmin ? <AdminVerifyGoldTxn/> : null,
        }}
        getReactKey={(key) => key}
        classOfContents="p-2"
      />
    </AgentIdContext.Provider>
  );
};

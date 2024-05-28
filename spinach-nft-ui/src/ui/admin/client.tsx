'use client';
import React from 'react';

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
          agents: '代理列表',
          members: '會員列表',
          exchangeRequests: 'NFT 交易請求',
          verifyId: '驗證身分',
          verifyBankAccount: '驗證銀行帳號',
          verifyBankTxn: '驗證 GOLD 購買紀錄',
          globalConfig: '全站設定',
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

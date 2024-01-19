'use client';
import React from 'react';

import {TabbedContent} from '@spinach/next/components/layout/tab/main';
import {adminTabsAdminOnly} from '@spinach/next/ui/admin/const';
import {AdminMembers} from '@spinach/next/ui/admin/members/main';
import {adminPageTabs} from '@spinach/next/ui/admin/type';
import {AdminVerifyBank} from '@spinach/next/ui/admin/verify/bank/main';
import {AdminVerifyGoldTxn} from '@spinach/next/ui/admin/verify/goldTxn/main';
import {AdminVerifyId} from '@spinach/next/ui/admin/verify/id/main';


type Props = {
  isAdmin: boolean,
};

export const AdminPageClient = ({isAdmin}: Props) => {
  return (
    <TabbedContent
      keys={[...adminPageTabs].filter((tab) => {
        if (adminTabsAdminOnly[tab]) {
          return isAdmin;
        }

        return true;
      })}
      defaultKey="members"
      tabTitle={{
        members: '會員列表',
        verifyId: '驗證身分',
        verifyBankAccount: '驗證銀行帳號',
        verifyBankTxn: '驗證 GOLD 購買紀錄',
      }}
      content={{
        members: <AdminMembers isAdmin={isAdmin}/>,
        verifyId: isAdmin ? <AdminVerifyId/> : null,
        verifyBankAccount: isAdmin ? <AdminVerifyBank/> : null,
        verifyBankTxn: isAdmin ? <AdminVerifyGoldTxn/> : null,
      }}
      getReactKey={(key) => key}
      classOfContents="p-2"
    />
  );
};

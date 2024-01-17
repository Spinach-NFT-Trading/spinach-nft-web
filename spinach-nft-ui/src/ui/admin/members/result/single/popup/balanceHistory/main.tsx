import React from 'react';

import {
  AdminMemberBalanceHistoryHeader,
} from '@spinach/next/ui/admin/members/result/single/popup/balanceHistory/header';
import {AdminMemberBalanceHistoryRow} from '@spinach/next/ui/admin/members/result/single/popup/balanceHistory/row';
import {AdminTimelineLookBackResultContent} from '@spinach/next/ui/admin/members/result/single/popup/common/content';
import {AdminTimelineLookBackResultLayout} from '@spinach/next/ui/admin/members/result/single/popup/common/layout';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/single/popup/type';


export const AdminMemberBalanceHistoryPopup = (props: AdminMemberPopupProps) => {
  return (
    <AdminTimelineLookBackResultLayout
      requestType="adminMemberBalanceHistory"
      header={<AdminMemberBalanceHistoryHeader/>}
      {...props}
    >
      {({status, lazyLoaded}) => {
        const response = lazyLoaded?.adminMemberBalanceHistory;

        return (
          <AdminTimelineLookBackResultContent
            data={response}
            status={status}
            renderEntry={(entry) => (
              <AdminMemberBalanceHistoryRow key={entry.id} history={entry}/>
            )}
            textOnLoading="餘額歷史"
            textOnNoResult="無餘額歷史"
          />
        );
      }}
    </AdminTimelineLookBackResultLayout>
  );
};

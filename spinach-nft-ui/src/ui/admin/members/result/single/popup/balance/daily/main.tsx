import React from 'react';

import {
  AdminMemberBalanceDailyHeader,
} from '@spinach/next/ui/admin/members/result/single/popup/balance/daily/header';
import {AdminMemberBalanceDailyRow} from '@spinach/next/ui/admin/members/result/single/popup/balance/daily/row';
import {getFlattenedDailySummary} from '@spinach/next/ui/admin/members/result/single/popup/balance/daily/utils';
import {AdminLookBackResultContent} from '@spinach/next/ui/admin/members/result/single/popup/common/content';
import {AdminLookBackResultLayout} from '@spinach/next/ui/admin/members/result/single/popup/common/layout';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/single/popup/type';


export const AdminMemberBalanceDailyPopup = (props: AdminMemberPopupProps) => {
  return (
    <AdminLookBackResultLayout
      requestType="adminMemberBalanceDaily"
      header={<AdminMemberBalanceDailyHeader/>}
      {...props}
    >
      {({status, lazyLoaded, request}) => {
        const response = lazyLoaded?.adminMemberBalanceDaily;

        return (
          <AdminLookBackResultContent
            data={
              response ?
                getFlattenedDailySummary({request: request.sent ?? request.control, data: response}) :
                []
            }
            status={status}
            renderEntry={(entry) => (
              <AdminMemberBalanceDailyRow key={entry.date} data={entry}/>
            )}
            textOnLoading="每日活動歷史"
            textOnNoResult="查無資料"
          />
        );
      }}
    </AdminLookBackResultLayout>
  );
};

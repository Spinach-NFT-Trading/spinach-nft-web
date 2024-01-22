import React from 'react';

import {toIsoLocalDateString} from '@spinach/common/utils/date';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {
  AdminMemberBalanceDailyHeader,
} from '@spinach/next/ui/admin/members/result/single/popup/balance/daily/header';
import {AdminMemberBalanceDailyRow} from '@spinach/next/ui/admin/members/result/single/popup/balance/daily/row';
import {
  AdminMemberBalanceDetailPopupState,
} from '@spinach/next/ui/admin/members/result/single/popup/balance/daily/type';
import {getFlattenedDailySummary} from '@spinach/next/ui/admin/members/result/single/popup/balance/daily/utils';
import {
  AdminMemberBalanceDetailsPopup,
} from '@spinach/next/ui/admin/members/result/single/popup/balance/details/main';
import {AdminLookBackResultContent} from '@spinach/next/ui/admin/members/result/single/popup/common/content';
import {AdminLookBackResultLayout} from '@spinach/next/ui/admin/members/result/single/popup/common/layout';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/single/popup/type';


export const AdminMemberBalanceDailyPopup = (props: AdminMemberPopupProps) => {
  const [popup, setPopup] = React.useState<AdminMemberBalanceDetailPopupState>({
    show: false,
    date: toIsoLocalDateString(new Date()),
  });

  return (
    <>
      <Popup show={popup.show} setShow={(show) => setPopup((original) => ({
        ...original,
        show,
      }))}>
        <Flex noFullWidth>
          <AdminMemberBalanceDetailsPopup initialDate={popup.date} {...props}/>
        </Flex>
      </Popup>
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
                <AdminMemberBalanceDailyRow
                  key={entry.date}
                  data={entry}
                  onExpandClick={() => setPopup({show: true, date: entry.date})}
                />
              )}
              textOnLoading="每日活動歷史"
              textOnNoResult="查無資料"
            />
          );
        }}
      </AdminLookBackResultLayout>
    </>
  );
};

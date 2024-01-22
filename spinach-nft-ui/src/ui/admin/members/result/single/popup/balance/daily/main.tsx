import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {
  AdminMemberBalanceDailyHeader,
} from '@spinach/next/ui/admin/members/result/single/popup/balance/daily/header';
import {AdminMemberBalanceDailyRow} from '@spinach/next/ui/admin/members/result/single/popup/balance/daily/row';
import {getFlattenedDailySummary} from '@spinach/next/ui/admin/members/result/single/popup/balance/daily/utils';
import {
  AdminMemberBalanceDetailsPopup,
} from '@spinach/next/ui/admin/members/result/single/popup/balance/details/main';
import {AdminLookBackResultContent} from '@spinach/next/ui/admin/members/result/single/popup/common/content';
import {AdminLookBackResultLayout} from '@spinach/next/ui/admin/members/result/single/popup/common/layout';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/single/popup/type';


export const AdminMemberBalanceDailyPopup = (props: AdminMemberPopupProps) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Popup show={show} setShow={setShow}>
        <Flex noFullWidth>
          <AdminMemberBalanceDetailsPopup {...props}/>
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
                <AdminMemberBalanceDailyRow key={entry.date} data={entry} onExpandClick={() => setShow(true)}/>
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

import React from 'react';

import {toIsoLocalDateString} from '@spinach/common/utils/date';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {
  AdminMemberBalanceDailyHeader,
} from '@spinach/next/ui/admin/members/result/member/popup/balance/daily/header';
import {AdminMemberBalanceDailyRow} from '@spinach/next/ui/admin/members/result/member/popup/balance/daily/row';
import {
  AdminMemberBalanceDetailPopupState,
} from '@spinach/next/ui/admin/members/result/member/popup/balance/daily/type';
import {getFlattenedDailySummary} from '@spinach/next/ui/admin/members/result/member/popup/balance/daily/utils';
import {
  AdminMemberBalanceDetailsPopup,
} from '@spinach/next/ui/admin/members/result/member/popup/balance/details/main';
import {AdminLookBackResultContent} from '@spinach/next/ui/admin/members/result/member/popup/common/content';
import {AdminLookBackResultLayout} from '@spinach/next/ui/admin/members/result/member/popup/common/layout';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/member/popup/type';


export const AdminMemberBalanceDailyPopup = (props: AdminMemberPopupProps) => {
  const {member} = props;

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
        <Flex noFullWidth className="h-[30vh]">
          <AdminMemberBalanceDetailsPopup initialDate={popup.date} {...props}/>
        </Flex>
      </Popup>
      <AdminLookBackResultLayout
        requestType="adminMemberBalanceDaily"
        header={<AdminMemberBalanceDailyHeader/>}
        {...props}
      >
        {({status, lazyLoaded, input}) => {
          const response = lazyLoaded?.adminMemberBalanceDaily;

          return (
            <AdminLookBackResultContent
              data={
                response ?
                  getFlattenedDailySummary({request: {...input, userId: member.id}, data: response}) :
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

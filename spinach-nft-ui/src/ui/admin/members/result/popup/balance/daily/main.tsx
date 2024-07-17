import React from 'react';

import {parse} from 'date-fns/parse';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {AdminMemberBalanceDailyHeader} from '@spinach/next/ui/admin/members/result/popup/balance/daily/header';
import {AdminMemberBalanceDailyRow} from '@spinach/next/ui/admin/members/result/popup/balance/daily/row';
import {AdminMemberBalanceDetailPopupState} from '@spinach/next/ui/admin/members/result/popup/balance/daily/type';
import {getFlattenedDailySummary} from '@spinach/next/ui/admin/members/result/popup/balance/daily/utils';
import {AdminMemberBalanceDetailsPopup} from '@spinach/next/ui/admin/members/result/popup/balance/details/main';
import {AdminLookBackResultContent} from '@spinach/next/ui/admin/members/result/popup/common/content';
import {AdminLookBackResultLayout} from '@spinach/next/ui/admin/members/result/popup/common/layout';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/popup/type';


export const AdminMemberBalanceDailyPopup = (props: AdminMemberPopupProps) => {
  const {member} = props;

  const [popup, setPopup] = React.useState<AdminMemberBalanceDetailPopupState>({
    show: false,
    date: new Date(),
  });

  const t = useTranslations('UI.InPage.Admin.Members.Popup.Balance.Daily.Content');

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
                  key={entry.dateString}
                  data={entry}
                  onExpandClick={() => setPopup({
                    show: true,
                    date: parse(entry.dateString, 'yyyy-MM-dd', new Date(entry.dateString)),
                  })}
                />
              )}
              textOnLoading={t('Loading')}
              textOnNoResult={t('NoResult')}
            />
          );
        }}
      </AdminLookBackResultLayout>
    </>
  );
};

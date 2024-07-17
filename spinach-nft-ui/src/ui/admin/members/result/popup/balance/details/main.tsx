import React from 'react';

import {useTranslations} from 'next-intl';

import {generateDataLookBackRequestOfSameDay} from '@spinach/next/ui/admin/common/lookback/utils';
import {AdminMemberBalanceDetailsHeader} from '@spinach/next/ui/admin/members/result/popup/balance/details/header';
import {AdminMemberBalanceDetailsRow} from '@spinach/next/ui/admin/members/result/popup/balance/details/row';
import {AdminLookBackResultContent} from '@spinach/next/ui/admin/members/result/popup/common/content';
import {AdminLookBackResultLayout} from '@spinach/next/ui/admin/members/result/popup/common/layout';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/popup/type';


type Props = AdminMemberPopupProps & {
  initialDate: Date,
};

export const AdminMemberBalanceDetailsPopup = ({initialDate, ...props}: Props) => {
  const t = useTranslations('UI.InPage.Admin.Members.Popup.Balance.Details.Content');

  return (
    <AdminLookBackResultLayout
      requestType="adminMemberBalanceDetails"
      header={<AdminMemberBalanceDetailsHeader/>}
      initialState={generateDataLookBackRequestOfSameDay(initialDate)}
      {...props}
    >
      {({status, lazyLoaded}) => {
        const response = lazyLoaded?.adminMemberBalanceDetails;

        return (
          <AdminLookBackResultContent
            data={response}
            status={status}
            renderEntry={(entry) => (
              <AdminMemberBalanceDetailsRow key={entry.id} history={entry}/>
            )}
            textOnLoading={t('Loading')}
            textOnNoResult={t('NoResult')}
          />
        );
      }}
    </AdminLookBackResultLayout>
  );
};

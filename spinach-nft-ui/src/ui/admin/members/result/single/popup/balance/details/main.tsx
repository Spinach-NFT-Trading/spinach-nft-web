import React from 'react';

import {
  AdminMemberBalanceDetailsHeader,
} from '@spinach/next/ui/admin/members/result/single/popup/balance/details/header';
import {AdminMemberBalanceDetailsRow} from '@spinach/next/ui/admin/members/result/single/popup/balance/details/row';
import {AdminLookBackResultContent} from '@spinach/next/ui/admin/members/result/single/popup/common/content';
import {AdminLookBackResultLayout} from '@spinach/next/ui/admin/members/result/single/popup/common/layout';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/single/popup/type';


export const AdminMemberBalanceDetailsPopup = (props: AdminMemberPopupProps) => {
  return (
    <AdminLookBackResultLayout
      requestType="adminMemberBalanceDetails"
      header={<AdminMemberBalanceDetailsHeader/>}
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
            textOnLoading="餘額歷史"
            textOnNoResult="無餘額歷史"
          />
        );
      }}
    </AdminLookBackResultLayout>
  );
};

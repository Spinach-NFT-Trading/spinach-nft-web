import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {
  AdminMemberBalanceHistoryHeader,
} from '@spinach/next/ui/admin/members/result/single/popup/balanceHistory/header';
import {AdminMemberBalanceHistoryRow} from '@spinach/next/ui/admin/members/result/single/popup/balanceHistory/row';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/single/popup/type';


export const AdminMemberBalanceHistoryPopup = ({member}: AdminMemberPopupProps) => {
  return (
    <UserDataLazyLoad
      options={{
        type: 'adminMemberBalanceHistory',
        opts: {
          userId: member.id,
        },
      }}
      loadingText="餘額歷史"
      content={(data) => {
        const history = data?.adminMemberBalanceHistory;

        if (!history?.length) {
          return '無餘額歷史';
        }

        return (
          <Flex noFullWidth>
            <AdminMemberBalanceHistoryHeader/>
            {history.map((entry) => (
              <AdminMemberBalanceHistoryRow
                key={entry.id}
                history={entry}
              />
            ))}
          </Flex>
        );
      }}
    />
  );
};

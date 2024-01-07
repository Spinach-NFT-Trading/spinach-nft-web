import React from 'react';

import {
  AdminMemberBalanceHistoryPopup,
} from '@spinach/next/ui/admin/members/result/single/popup/balanceHistory/main';
import {AdminMemberBankDetailsPopup} from '@spinach/next/ui/admin/members/result/single/popup/bankDetails';
import {AdminMemberInfoPopup} from '@spinach/next/ui/admin/members/result/single/popup/info';
import {AdminMemberNftTxnPopup} from '@spinach/next/ui/admin/members/result/single/popup/nftTxn/main';
import {AdminMemberPopupContentProps} from '@spinach/next/ui/admin/members/result/single/popup/type';


export const AdminMemberPopupContent = ({type, ...props}: AdminMemberPopupContentProps) => {
  if (type === 'info') {
    return <AdminMemberInfoPopup {...props}/>;
  }

  if (type === 'bankDetails') {
    return <AdminMemberBankDetailsPopup {...props}/>;
  }

  if (type === 'nftTxn') {
    return <AdminMemberNftTxnPopup {...props}/>;
  }

  if (type === 'balanceHistory') {
    return <AdminMemberBalanceHistoryPopup {...props}/>;
  }

  throw new Error(`Unhandled admin member popup content type: [${type satisfies never}]`);
};

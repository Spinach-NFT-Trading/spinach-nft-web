import React from 'react';

import {AdminMemberBankDetailsPopup} from '@spinach/next/ui/admin/members/result/single/popup/bankDetails';
import {AdminMemberInfoPopup} from '@spinach/next/ui/admin/members/result/single/popup/info';
import {AdminMemberPopupContentProps} from '@spinach/next/ui/admin/members/result/single/popup/type';


export const AdminMemberPopupContent = ({type, ...props}: AdminMemberPopupContentProps) => {
  if (type === 'info') {
    return <AdminMemberInfoPopup {...props}/>;
  }

  if (type === 'bankDetails') {
    return <AdminMemberBankDetailsPopup {...props}/>;
  }

  throw new Error(`Unhandled admin member popup content type: [${type satisfies never}]`);
};

import React from 'react';

import {AdminMemberBalanceDailyPopup} from '@spinach/next/ui/admin/members/result/popup/balance/daily/main';
import {AdminMemberBankDetailsPopup} from '@spinach/next/ui/admin/members/result/popup/bankDetails';
import {
  AdminMemberIdVerificationImagesPopup,
} from '@spinach/next/ui/admin/members/result/popup/idVerificationImages/main';
import {AdminMemberInfoPopup} from '@spinach/next/ui/admin/members/result/popup/info';
import {AdminMemberManualAdjustPopup} from '@spinach/next/ui/admin/members/result/popup/manualAdjust/main';
import {AdminMemberNftTxnPopup} from '@spinach/next/ui/admin/members/result/popup/nftTxn/main';
import {AdminMemberSetPasswordPopup} from '@spinach/next/ui/admin/members/result/popup/setPassword';
import {AdminMemberSetRecruiterPopup} from '@spinach/next/ui/admin/members/result/popup/setRecruiter/main';
import {AdminMemberPopupContentProps} from '@spinach/next/ui/admin/members/result/popup/type';


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
    return <AdminMemberBalanceDailyPopup {...props}/>;
  }

  if (type === 'manualAdjust') {
    return <AdminMemberManualAdjustPopup {...props}/>;
  }

  if (type === 'idVerificationImages') {
    return <AdminMemberIdVerificationImagesPopup {...props}/>;
  }

  if (type === 'setPassword') {
    return <AdminMemberSetPasswordPopup {...props}/>;
  }

  if (type === 'setRecruiter') {
    return <AdminMemberSetRecruiterPopup {...props}/>;
  }


  throw new Error(`Unhandled admin member popup content type: [${type satisfies never}]`);
};

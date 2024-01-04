import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {VerificationStatusUi} from '@spinach/next/components/shared/common/verified';
import {AdminMemberDataCell} from '@spinach/next/ui/admin/members/result/common/cell';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/single/popup/type';


export const AdminMemberBankDetailsPopup = ({member}: AdminMemberPopupProps) => {
  const {bankDetails} = member;

  if (!bankDetails.length) {
    return '無相關銀行帳號';
  }

  return (
    <Flex className="gap-1.5 p-1">
      {bankDetails.map(({status, account, code, uuid}) => (
        <Flex key={uuid} className="gap-1">
          <VerificationStatusUi status={status}/>
          <AdminMemberDataCell center={false} title="銀行代碼" info={code}/>
          <AdminMemberDataCell center={false} title="銀行帳號" info={account}/>
        </Flex>
      ))}
    </Flex>
  );
};

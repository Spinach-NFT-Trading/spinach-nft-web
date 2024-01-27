import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {VerificationStatusUi} from '@spinach/next/components/shared/common/verified';
import {AdminMemberDataCell} from '@spinach/next/ui/admin/members/result/common/cell';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/member/popup/type';


export const AdminMemberInfoPopup = ({member}: AdminMemberPopupProps) => {
  const {
    id,
    status,
    idNumber,
    username,
    name,
    birthday,
    email,
    lineId,
    recruitedBy,
    wallet,
  } = member;

  return (
    <Flex center className="gap-1.5 p-1">
      <VerificationStatusUi status={status}/>
      <AdminMemberDataCell title="使用者 ID" info={id}/>
      <AdminMemberDataCell title="使用者 ID" info={username}/>
      <AdminMemberDataCell title="真實姓名" info={name}/>
      <AdminMemberDataCell title="身分證字號" info={idNumber}/>
      <AdminMemberDataCell title="生日" info={birthday}/>
      <AdminMemberDataCell title="Email" info={email}/>
      <AdminMemberDataCell title="LINE ID" info={lineId}/>
      <AdminMemberDataCell title="虛擬貨幣錢包" info={wallet}/>
      {recruitedBy && <AdminMemberDataCell title="代理上線 ID" info={recruitedBy}/>}
    </Flex>
  );
};

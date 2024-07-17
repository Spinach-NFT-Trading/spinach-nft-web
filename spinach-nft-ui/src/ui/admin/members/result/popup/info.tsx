import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {VerificationStatusUi} from '@spinach/next/components/shared/common/verified';
import {AdminMemberDataCell} from '@spinach/next/ui/admin/common/cell';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/popup/type';


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

  const t = useTranslations('UI.InPage.Admin.Members');

  return (
    <Flex center className="gap-1.5 p-1">
      <VerificationStatusUi status={status}/>
      <AdminMemberDataCell title={t('Info.Id')} info={id}/>
      <AdminMemberDataCell title={t('Info.Username')} info={username}/>
      <AdminMemberDataCell title={t('Info.Name')} info={name}/>
      <AdminMemberDataCell title={t('Info.IdNumber')} info={idNumber}/>
      <AdminMemberDataCell title={t('Info.Birthday')} info={birthday}/>
      <AdminMemberDataCell title={t('Info.Email')} info={email}/>
      <AdminMemberDataCell title={t('Info.LineId')} info={lineId}/>
      <AdminMemberDataCell title={t('Info.Wallet')} info={wallet}/>
      {recruitedBy && <AdminMemberDataCell title={t('Info.Recruiter')} info={recruitedBy}/>}
    </Flex>
  );
};

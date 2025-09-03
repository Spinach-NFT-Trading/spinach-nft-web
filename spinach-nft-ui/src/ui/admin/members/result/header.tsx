import React from 'react';

import {useTranslations} from 'next-intl';

import {CommonUserPermissionFlags} from '@spinach/next/types/auth';
import {adminMemberMonetaryCellStyle} from '@spinach/next/ui/admin/common/cell/monetary/const';
import {isCommissionReadable} from '@spinach/next/ui/admin/members/result/utils';


type Props = {
  permissionFlags: CommonUserPermissionFlags,
};

export const AdminMemberSingleHeader = ({permissionFlags}: Props) => {
  const t = useTranslations('UI.InPage.Admin.Members.Header');

  return (
    <tr className="items-center gap-1 bg-slate-900/90 px-1 py-2">
      <td className="w-52">
        {t('UserId')}
      </td>
      <td className="w-20">
        {t('VerificationStatus')}
      </td>
      <td className="w-16">
        {t('Agent')}
      </td>
      <td className="w-16">
        {t('Status')}
      </td>
      <td className={adminMemberMonetaryCellStyle}>
        {t('CurrentBalance')}
      </td>
      <td className={adminMemberMonetaryCellStyle}>
        {t('NftBought')}
      </td>
      <td className={adminMemberMonetaryCellStyle}>
        {t('NftSold')}
      </td>
      <td className={adminMemberMonetaryCellStyle}>
        {t('DepositedTwd')}
      </td>
      <td className={adminMemberMonetaryCellStyle}>
        {t('DepositedUsdt')}
      </td>
      <td className={adminMemberMonetaryCellStyle}>
        {t('Cashback')}
      </td>
      {
        isCommissionReadable({type: 'member', permissionFlags}) &&
        <td className="w-60">
          {t('CashbackSettings.Member')}
        </td>
      }
      <td className="w-[42rem]"/>
    </tr>
  );
};

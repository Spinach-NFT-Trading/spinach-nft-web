import React from 'react';

import {useTranslations} from 'next-intl';

import {CommonUserPermissionFlags} from '@spinach/next/types/auth';
import {adminMemberMonetaryCellStyle} from '@spinach/next/ui/admin/common/cell/monetary/const';
import {isCommissionReadable} from '@spinach/next/ui/admin/members/result/utils';


type Props = {
  permissionFlags: CommonUserPermissionFlags,
};

export const AdminAgentHeader = ({permissionFlags}: Props) => {
  const t = useTranslations('UI.InPage.Admin.Agents.Header');

  return (
    <tr className="bg-slate-900/90">
      <td className="w-52">
        {t('UserName')}
      </td>
      <td className={adminMemberMonetaryCellStyle}>
        {t('TotalBalance')}
      </td>
      <td className={adminMemberMonetaryCellStyle}>
        {t('TotalNftBought')}
      </td>
      <td className={adminMemberMonetaryCellStyle}>
        {t('TotalNftSold')}
      </td>
      <td className={adminMemberMonetaryCellStyle}>
        {t('DepositedTwd')}
      </td>
      <td className={adminMemberMonetaryCellStyle}>
        {t('DepositedUsdt')}
      </td>
      {
        isCommissionReadable({type: 'agent', permissionFlags}) &&
        <td className="w-60">
          {t('CashbackSettings.Agent')}
        </td>
      }
      <td className="w-80"/>
    </tr>
  );
};

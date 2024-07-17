import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {adminMemberMonetaryCellStyle} from '@spinach/next/ui/admin/common/cell/monetary/const';


export const AdminAgentHeader = () => {
  const t = useTranslations('UI.InPage.Admin.Agents.Header');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1 bg-slate-900/90 px-1 py-2">
      <Flex center noFullWidth className="w-52">
        {t('UserName')}
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        {t('TotalBalance')}
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        {t('TotalNftBought')}
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        {t('TotalNftSold')}
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        {t('DepositedTwd')}
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        {t('DepositedUsdt')}
      </Flex>
      <Flex center noFullWidth className="w-60">
        {t('CashbackSettings')}
      </Flex>
      <Flex noFullWidth className="w-80"/>
    </Flex>
  );
};

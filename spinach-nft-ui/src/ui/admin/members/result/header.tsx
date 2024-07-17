import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {adminMemberMonetaryCellStyle} from '@spinach/next/ui/admin/common/cell/monetary/const';


type Props = {
  isAdmin: boolean,
};

export const AdminMemberSingleHeader = ({isAdmin}: Props) => {
  const t = useTranslations('UI.InPage.Admin.Members.Header');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1 bg-slate-900/90 px-1 py-2">
      <Flex center noFullWidth className="w-52">
        {t('UserId')}
      </Flex>
      <Flex center noFullWidth className="w-20">
        {t('VerificationStatus')}
      </Flex>
      <Flex center noFullWidth className="w-16">
        {t('Agent')}
      </Flex>
      <Flex center noFullWidth className="w-16">
        {t('Status')}
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        {t('CurrentBalance')}
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        {t('NftBought')}
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        {t('NftSold')}
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        {t('DepositedTwd')}
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        {t('DepositedUsdt')}
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        {t('Cashback')}
      </Flex>
      {
        isAdmin &&
        <Flex center noFullWidth className="w-60">
          {t('CashbackSettings')}
        </Flex>
      }
      <Flex noFullWidth className="w-[42rem]"/>
    </Flex>
  );
};

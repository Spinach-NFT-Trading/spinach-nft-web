import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {userBalanceHistoryTypeText} from '@spinach/next/const/balance';
import {adminMemberMonetaryCellStyle} from '@spinach/next/ui/admin/common/cell/monetary/const';


export const AdminMemberBalanceDailyHeader = () => {
  const t = useTranslations('UI.User.Balance.HistoryType');
  const t2 = useTranslations('UI.InPage.Admin.Members.Popup.Balance.Daily.Header');

  return (
    <Flex noFullWidth direction="row" className="bg-slate-800 p-1.5">
      <Flex center noFullWidth className="w-28">
        {t2('Date')}
      </Flex>
      <Flex center noFullWidth className={clsx(adminMemberMonetaryCellStyle, 'text-sm')}>
        {t2('EodBalance')}
      </Flex>
      <Flex center noFullWidth className={clsx(adminMemberMonetaryCellStyle, 'text-sm')}>
        {t(userBalanceHistoryTypeText['nftBuy'])}
      </Flex>
      <Flex center noFullWidth className={clsx(adminMemberMonetaryCellStyle, 'text-sm')}>
        {t(userBalanceHistoryTypeText['deposit.crypto'])}
      </Flex>
      <Flex center noFullWidth className={clsx(adminMemberMonetaryCellStyle, 'text-sm')}>
        {t(userBalanceHistoryTypeText['deposit.twBank'])}
      </Flex>
      <Flex center noFullWidth className="w-16"/>
    </Flex>
  );
};

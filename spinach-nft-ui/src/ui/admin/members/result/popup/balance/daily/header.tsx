import React from 'react';

import clsx from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {userBalanceHistoryTypeText} from '@spinach/next/const/balance';
import {adminMemberMonetaryCellStyle} from '@spinach/next/ui/admin/common/cell/monetary/const';


export const AdminMemberBalanceDailyHeader = () => {
  return (
    <Flex noFullWidth direction="row" className="bg-slate-800 p-1.5">
      <Flex center noFullWidth className="w-28">
        日期
      </Flex>
      <Flex center noFullWidth className={clsx(adminMemberMonetaryCellStyle, 'text-sm')}>
        日結餘額
      </Flex>
      <Flex center noFullWidth className={clsx(adminMemberMonetaryCellStyle, 'text-sm')}>
        {userBalanceHistoryTypeText['nftBuy']}
      </Flex>
      <Flex center noFullWidth className={clsx(adminMemberMonetaryCellStyle, 'text-sm')}>
        {userBalanceHistoryTypeText['deposit.crypto']}
      </Flex>
      <Flex center noFullWidth className={clsx(adminMemberMonetaryCellStyle, 'text-sm')}>
        {userBalanceHistoryTypeText['deposit.twBank']}
      </Flex>
      <Flex center noFullWidth className="w-16"/>
    </Flex>
  );
};

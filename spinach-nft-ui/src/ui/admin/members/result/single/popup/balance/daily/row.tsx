import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserBalanceDailySummaryOfDay} from '@spinach/next/types/mongo/balance';
import {AdminMemberMonetaryCell} from '@spinach/next/ui/admin/members/result/single/cell/monetary/main';


type Props = {
  data: UserBalanceDailySummaryOfDay,
};

export const AdminMemberBalanceDailyRow = ({
  data,
}: Props) => {
  const {
    date,
    endBalance,
    total,
  } = data;

  return (
    <Flex direction="row" noFullWidth className="border-b-slate-400 p-1.5 not-last:border-b">
      <Flex center noFullWidth className="w-28 whitespace-nowrap">
        {date}
      </Flex>
      <AdminMemberMonetaryCell value={endBalance} applySignStyle/>
      <AdminMemberMonetaryCell value={total['nftBuy']} applySignStyle/>
      <AdminMemberMonetaryCell value={total['deposit.crypto']} applySignStyle/>
      <AdminMemberMonetaryCell value={total['deposit.twBank']} applySignStyle/>
    </Flex>
  );
};


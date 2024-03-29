import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserBalanceDailySummaryOfDay} from '@spinach/next/types/mongo/balance';
import {AdminMemberMonetaryCell} from '@spinach/next/ui/admin/common/cell/monetary/main';


type Props = {
  data: UserBalanceDailySummaryOfDay,
  onExpandClick: () => void,
};

export const AdminMemberBalanceDailyRow = ({
  data,
  onExpandClick,
}: Props) => {
  const {
    dateString,
    endBalance,
    total,
  } = data;

  return (
    <Flex direction="row" noFullWidth className="not-last:border-b border-b-slate-400 p-1.5">
      <Flex center noFullWidth className="w-28 whitespace-nowrap">
        {dateString}
      </Flex>
      <AdminMemberMonetaryCell value={endBalance} applySignStyle/>
      <AdminMemberMonetaryCell value={total['nftBuy']} applySignStyle/>
      <AdminMemberMonetaryCell value={total['deposit.crypto']} applySignStyle/>
      <AdminMemberMonetaryCell value={total['deposit.twBank']} applySignStyle/>
      <Flex noFullWidth className="w-16 text-sm">
        <button className="button-clickable-bg p-0.5" onClick={onExpandClick}>
          詳細
        </button>
      </Flex>
    </Flex>
  );
};


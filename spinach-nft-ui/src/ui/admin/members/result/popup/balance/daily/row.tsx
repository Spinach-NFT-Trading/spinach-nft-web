import React from 'react';

import {useTranslations} from 'next-intl';

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

  const t = useTranslations('UI.InPage.Admin.Members.Popup.Balance.Daily');

  return (
    <Flex direction="row" noFullWidth className="border-b-slate-400 p-1.5 not-last:border-b">
      <Flex center noFullWidth className="w-28 whitespace-nowrap">
        {dateString}
      </Flex>
      <AdminMemberMonetaryCell value={endBalance} applySignStyle/>
      <AdminMemberMonetaryCell value={total['nftBuy']} applySignStyle/>
      <AdminMemberMonetaryCell value={total['deposit.crypto']} applySignStyle/>
      <AdminMemberMonetaryCell value={total['deposit.twBank']} applySignStyle/>
      <Flex noFullWidth className="w-16 text-sm">
        <button className="button-clickable-bg p-0.5" onClick={onExpandClick}>
          {t('Details')}
        </button>
      </Flex>
    </Flex>
  );
};


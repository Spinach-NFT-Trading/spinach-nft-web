import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserBalanceActivity} from '@spinach/next/types/mongo/balance';
import {AdminMemberActivityCell} from '@spinach/next/ui/admin/common/summary/cell';
import {getSumOfBalanceActivity} from '@spinach/next/ui/admin/common/utils';


type Props = {
  activities: UserBalanceActivity[],
};

export const AdminMemberActivitySummary = ({activities}: Props) => {
  const t = useTranslations('UI.InPage.Admin.Common.Summary');

  return (
    <Flex direction="row" className="gap-1">
      <AdminMemberActivityCell
        title={t('TotalBalance')}
        value={getSumOfBalanceActivity({
          activities,
          getValue: ({currentBalance}) => currentBalance,
        })}
      />
      <AdminMemberActivityCell
        title={t('TotalNftBought')}
        value={getSumOfBalanceActivity({
          activities,
          getValue: ({byTxnType}) => byTxnType['nftBuy'],
        })}
      />
      <AdminMemberActivityCell
        title={t('TotalNftSold')}
        value={getSumOfBalanceActivity({
          activities,
          getValue: ({byTxnType}) => byTxnType['nftSell'],
        })}
      />
      <AdminMemberActivityCell
        title={t('TotalDepositedUsdt')}
        value={getSumOfBalanceActivity({
          activities,
          getValue: ({byTxnType}) => byTxnType['deposit.crypto'],
        })}
      />
      <AdminMemberActivityCell
        title={t('TotalDepositedTwd')}
        value={getSumOfBalanceActivity({
          activities,
          getValue: ({byTxnType}) => byTxnType['deposit.twBank'],
        })}
      />
    </Flex>
  );
};

import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserBalanceActivity} from '@spinach/next/types/mongo/balance';
import {AdminMemberActivityCell} from '@spinach/next/ui/admin/common/summary/cell';
import {getSumOfBalanceActivity} from '@spinach/next/ui/admin/common/utils';


type Props = {
  activities: UserBalanceActivity[],
};

export const AdminMemberActivitySummary = ({activities}: Props) => {
  return (
    <Flex direction="row" className="gap-1">
      <AdminMemberActivityCell
        title="總餘額"
        value={getSumOfBalanceActivity({
          activities,
          getValue: ({currentBalance}) => currentBalance,
        })}
      />
      <AdminMemberActivityCell
        title="總 NFT 購買量"
        value={getSumOfBalanceActivity({
          activities,
          getValue: ({byTxnType}) => byTxnType['nftBuy'],
        })}
      />
      <AdminMemberActivityCell
        title="總 NFT 售出量"
        value={getSumOfBalanceActivity({
          activities,
          getValue: ({byTxnType}) => byTxnType['nftSell'],
        })}
      />
      <AdminMemberActivityCell
        title="總 USDT 入金量"
        value={getSumOfBalanceActivity({
          activities,
          getValue: ({byTxnType}) => byTxnType['deposit.crypto'],
        })}
      />
      <AdminMemberActivityCell
        title="總台幣入金量"
        value={getSumOfBalanceActivity({
          activities,
          getValue: ({byTxnType}) => byTxnType['deposit.twBank'],
        })}
      />
    </Flex>
  );
};

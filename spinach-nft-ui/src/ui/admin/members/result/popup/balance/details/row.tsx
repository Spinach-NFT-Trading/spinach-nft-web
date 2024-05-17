import React from 'react';

import {clsx} from 'clsx';
import {format} from 'date-fns/format';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {userBalanceHistoryTypeText} from '@spinach/next/const/balance';
import {userBalanceHistoryTypeTextStyle} from '@spinach/next/styles/balance';
import {UserBalanceHistoryModelClient} from '@spinach/next/types/mongo/balance';
import {AdminMemberMonetaryCell} from '@spinach/next/ui/admin/common/cell/monetary/main';


type Props = {
  history: UserBalanceHistoryModelClient,
};

export const AdminMemberBalanceDetailsRow = ({
  history,
}: Props) => {
  const {
    epochMs,
    type,
    current,
    diff,
  } = history;

  return (
    <Flex direction="row" noFullWidth className="not-last:border-b border-b-slate-400 p-2">
      <Flex center noFullWidth className="w-40 whitespace-nowrap">
        {format(epochMs, 'yyyy-MM-dd HH:mm:ss')}
      </Flex>
      <Flex center noFullWidth className={clsx('w-40 whitespace-nowrap', userBalanceHistoryTypeTextStyle[type])}>
        {userBalanceHistoryTypeText[type]}
      </Flex>
      <Flex center noFullWidth className="w-28">
        <AdminMemberMonetaryCell value={diff} applySignStyle/>
      </Flex>
      <Flex center noFullWidth className="w-28">
        <AdminMemberMonetaryCell value={current}/>
      </Flex>
    </Flex>
  );
};


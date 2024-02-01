import React from 'react';

import IdentificationIcon from '@heroicons/react/24/outline/IdentificationIcon';
import {UserData, UserInfoListByAgent} from '@spinach/common/types/common/user';
import {isNotNullish} from '@spinach/common/utils/type';
import clsx from 'clsx';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserBalanceActivityMap} from '@spinach/next/types/mongo/balance';
import {AdminAgentName} from '@spinach/next/ui/admin/common/agent';
import {AdminMemberMonetaryCell} from '@spinach/next/ui/admin/common/cell/monetary/main';
import {getSumOfBalanceActivity} from '@spinach/next/ui/admin/common/utils';


type Props = {
  data: UserInfoListByAgent,
  agent: UserData | null,
  balanceActivityMap: UserBalanceActivityMap,
  onMemberListClick: () => void,
};

export const AdminAgentRow = ({
  data,
  agent,
  balanceActivityMap,
  onMemberListClick,
}: Props) => {
  const {members} = data;
  const activities = members
    .map(({id}) => balanceActivityMap[id])
    .filter(isNotNullish);

  return (
    <Flex direction="row" noFullWidth className="gap-1">
      <Flex noFullWidth className="w-52 justify-center">
        <AdminAgentName agent={agent}/>
      </Flex>
      <AdminMemberMonetaryCell value={getSumOfBalanceActivity({
        activities,
        getValue: ({currentBalance}) => currentBalance,
      })}/>
      <AdminMemberMonetaryCell applySignStyle value={getSumOfBalanceActivity({
        activities,
        getValue: ({byTxnType}) => byTxnType['nftBuy'],
      })}/>
      <AdminMemberMonetaryCell applySignStyle value={getSumOfBalanceActivity({
        activities,
        getValue: ({byTxnType}) => byTxnType['nftSell'],
      })}/>
      <AdminMemberMonetaryCell applySignStyle value={getSumOfBalanceActivity({
        activities,
        getValue: ({byTxnType}) => byTxnType['deposit.twBank'],
      })}/>
      <AdminMemberMonetaryCell applySignStyle value={getSumOfBalanceActivity({
        activities,
        getValue: ({byTxnType}) => byTxnType['deposit.crypto'],
      })}/>
      <FlexButton onClick={onMemberListClick} className={clsx(
        'button-clickable-bg items-center gap-1 whitespace-nowrap p-1',
      )}>
        <IdentificationIcon className="h-6 w-6"/>
        <div>下線列表</div>
      </FlexButton>
    </Flex>
  );
};

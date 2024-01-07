import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {UserInfo} from '@spinach/common/types/common/user';
import clsx from 'clsx';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {VerificationStatusUi} from '@spinach/next/components/shared/common/verified';
import {UserBalanceSummary} from '@spinach/next/types/mongo/balance';
import {AdminMemberMonetaryCell} from '@spinach/next/ui/admin/members/result/single/cell/monetary/main';
import {AdminMemberSingleControls} from '@spinach/next/ui/admin/members/result/single/control';
import {AdminMemberPopupType} from '@spinach/next/ui/admin/members/result/single/popup/type';
import {formatUserName} from '@spinach/next/utils/data/user';


type Props = {
  style: React.CSSProperties,
  member: UserInfo,
  isAdmin: boolean,
  balanceSummary: UserBalanceSummary | undefined,
  agentToggleDisabled: boolean,
  onSetAgent: (enable: boolean) => void,
  showPopup: (type: AdminMemberPopupType) => void,
};

export const AdminMemberSingleResult = ({
  style,
  member,
  isAdmin,
  balanceSummary,
  agentToggleDisabled,
  onSetAgent,
  showPopup,
}: Props) => {
  const {
    status,
    agent,
  } = member;

  return (
    <Flex direction="row" noFullWidth style={style} className="border-b-slate-400 p-2 not-last:border-b">
      <Flex noFullWidth className="w-52 justify-center">
        {formatUserName(member)}
      </Flex>
      <Flex noFullWidth center className="w-20">
        <VerificationStatusUi status={status}/>
      </Flex>
      <Flex noFullWidth center className="w-16">
        {
          isAdmin &&
          <FlexButton
            className={clsx(
              'items-center gap-0.5 whitespace-nowrap p-1 text-sm',
              isAdmin ? 'button-clickable-bg' : 'button-bg rounded-lg',
              !agent && 'text-slate-500',
            )}
            onClick={() => onSetAgent(!agent)}
            disabled={agentToggleDisabled || !isAdmin}
          >
            {agent ? <CheckCircleIcon className="h-5 w-5"/> :<XCircleIcon className="h-5 w-5"/>}
            <div>代理</div>
          </FlexButton>
        }
      </Flex>
      <AdminMemberMonetaryCell value={balanceSummary?.currentBalance}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceSummary?.byTxnType['nftBuy']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceSummary?.byTxnType['nftSell']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceSummary?.byTxnType['deposit.twBank']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceSummary?.byTxnType['deposit.crypto']}/>
      <AdminMemberSingleControls showPopup={showPopup}/>
    </Flex>
  );
};

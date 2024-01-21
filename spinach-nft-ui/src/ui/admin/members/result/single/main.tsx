import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import LockOpenIcon from '@heroicons/react/24/solid/LockOpenIcon';
import {UserInfo} from '@spinach/common/types/common/user';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {VerificationStatusUi} from '@spinach/next/components/shared/common/verified';
import {UserBalanceSummary} from '@spinach/next/types/mongo/balance';
import {AdminMemberControlButton} from '@spinach/next/ui/admin/members/result/single/button';
import {AdminMemberMonetaryCell} from '@spinach/next/ui/admin/members/result/single/cell/monetary/main';
import {AdminMemberSingleControls} from '@spinach/next/ui/admin/members/result/single/control';
import {AdminMemberPopupType} from '@spinach/next/ui/admin/members/result/single/popup/type';
import {formatUserName} from '@spinach/next/utils/data/user';


type Props = {
  member: UserInfo,
  isAdmin: boolean,
  balanceSummary: UserBalanceSummary | undefined,
  controlDisabled: boolean,
  onSetAgent: (isAgent: boolean) => void,
  onSetSuspended: (isSuspended: boolean) => void,
  showPopup: (type: AdminMemberPopupType) => void,
};

export const AdminMemberSingleResult = ({
  member,
  isAdmin,
  balanceSummary,
  controlDisabled,
  onSetAgent,
  onSetSuspended,
  showPopup,
}: Props) => {
  const {
    status,
    isAgent,
    isSuspended,
  } = member;

  return (
    <Flex direction="row" noFullWidth className="gap-1">
      <Flex noFullWidth className="w-52 justify-center">
        {formatUserName(member)}
      </Flex>
      <Flex noFullWidth center className="w-20">
        <VerificationStatusUi status={status}/>
      </Flex>
      <Flex noFullWidth center className="w-16">
        <AdminMemberControlButton
          text="代理"
          isAdmin={isAdmin}
          active={isAgent}
          disabled={controlDisabled}
          onClick={() => onSetAgent(!isAgent)}
          icon={{
            active: <CheckCircleIcon className="h-5 w-5"/>,
            inactive: <XCircleIcon className="h-5 w-5"/>,
          }}
        />
      </Flex>
      <Flex noFullWidth center className="w-16">
        {
          !member.isAdmin &&
          <AdminMemberControlButton
            text={isSuspended ? '停用' : '正常'}
            isAdmin={isAdmin}
            active={isSuspended}
            disabled={controlDisabled}
            onClick={() => onSetSuspended(!isSuspended)}
            icon={{
              active: <LockClosedIcon className="h-5 w-5"/>,
              inactive: <LockOpenIcon className="h-5 w-5"/>,
            }}
            classOnActive="text-red-300"
            classOnInactive="text-green-300"
          />
        }
      </Flex>
      <AdminMemberMonetaryCell value={balanceSummary?.currentBalance}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceSummary?.byTxnType['nftBuy']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceSummary?.byTxnType['nftSell']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceSummary?.byTxnType['deposit.twBank']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceSummary?.byTxnType['deposit.crypto']}/>
      <AdminMemberMonetaryCell applySignStyle value={0}/>
      <AdminMemberSingleControls showPopup={showPopup}/>
    </Flex>
  );
};

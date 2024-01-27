import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import LockOpenIcon from '@heroicons/react/24/solid/LockOpenIcon';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {UserInfo} from '@spinach/common/types/common/user';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {VerificationStatusUi} from '@spinach/next/components/shared/common/verified';
import {UserBalanceSummary} from '@spinach/next/types/mongo/balance';
import {UserDataActor} from '@spinach/next/types/userData/main';
import {AdminMemberControlButton} from '@spinach/next/ui/admin/members/result/member/button';
import {AdminMemberCommissionSettingsCell} from '@spinach/next/ui/admin/members/result/member/cell/commission/main';
import {AdminMemberMonetaryCell} from '@spinach/next/ui/admin/members/result/member/cell/monetary/main';
import {AdminMemberSingleControls} from '@spinach/next/ui/admin/members/result/member/control';
import {AdminMemberPopupType} from '@spinach/next/ui/admin/members/result/member/popup/type';
import {formatUserName} from '@spinach/next/utils/data/user';


type Props = {
  member: UserInfo,
  balanceSummary: UserBalanceSummary | undefined,
  isAdmin: boolean,
  controlDisabled: boolean,
  act: UserDataActor,
  showPopup: (type: AdminMemberPopupType) => void,
  onUpdateError: (error: ApiErrorCode) => void,
  onUpdatedMember: (updated: UserInfo) => void,
};

export const AdminMemberSingleResult = ({
  member,
  balanceSummary,
  isAdmin,
  controlDisabled,
  act,
  showPopup,
  onUpdateError,
  onUpdatedMember,
}: Props) => {
  const {
    id,
    status,
    isAgent,
    isSuspended,
    commissionRate,
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
          icon={{
            active: <CheckCircleIcon className="h-5 w-5"/>,
            inactive: <XCircleIcon className="h-5 w-5"/>,
          }}
          onSuccess={(isAgent) => onUpdatedMember({...member, isAgent})}
          onError={onUpdateError}
          sendRequest={(isAgent) => act({
            action: 'request',
            options: {
              type: 'admin.member.mark.agent',
              data: {targetId: id, isAgent},
            },
          })}
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
            icon={{
              active: <LockClosedIcon className="h-5 w-5"/>,
              inactive: <LockOpenIcon className="h-5 w-5"/>,
            }}
            onSuccess={(isSuspended) => onUpdatedMember({...member, isSuspended})}
            onError={onUpdateError}
            sendRequest={(isSuspended) => act({
              action: 'request',
              options: {
                type: 'admin.member.mark.suspended',
                data: {targetId: id, isSuspended},
              },
            })}
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
      <AdminMemberCommissionSettingsCell
        commissionRate={commissionRate}
        setCommissionRate={(commissionRate) => onUpdatedMember({...member, commissionRate})}
        isAdmin={isAdmin}
        disabled={controlDisabled}
        onUpload={async (commissionRate) => {
          const session = await act({
            action: 'request',
            options: {
              type: 'admin.member.update.commission',
              data: {targetId: id, commissionRate},
            },
          });

          const error = session?.user.jwtUpdateError;
          if (error) {
            onUpdateError(error);
          }

          onUpdatedMember({...member, commissionRate});
        }}
      />
      <AdminMemberSingleControls showPopup={showPopup}/>
    </Flex>
  );
};

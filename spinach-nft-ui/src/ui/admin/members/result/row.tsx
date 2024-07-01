import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import LockOpenIcon from '@heroicons/react/24/solid/LockOpenIcon';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {UserInfo} from '@spinach/common/types/common/user/info';
import {signIn} from 'next-auth/react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {VerificationStatusUi} from '@spinach/next/components/shared/common/verified';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {CommonUserData} from '@spinach/next/types/auth';
import {UserBalanceActivity} from '@spinach/next/types/mongo/balance';
import {UserDataActor} from '@spinach/next/types/userData/main';
import {AdminMemberCommissionSettingsCell} from '@spinach/next/ui/admin/common/cell/commission/main';
import {AdminMemberMonetaryCell} from '@spinach/next/ui/admin/common/cell/monetary/main';
import {AdminMemberControlButton} from '@spinach/next/ui/admin/members/result/button';
import {AdminMemberSingleControls} from '@spinach/next/ui/admin/members/result/control';
import {AdminMemberPopupType} from '@spinach/next/ui/admin/members/result/popup/type';
import {formatUserName, isUserPrivileged} from '@spinach/next/utils/data/user';


type Props = {
  member: UserInfo,
  balanceActivity: UserBalanceActivity | undefined,
  actor: CommonUserData,
  controlDisabled: boolean,
  act: UserDataActor,
  showPopup: (type: AdminMemberPopupType) => void,
  onUpdateError: (error: ApiErrorCode) => void,
  onUpdatedMember: (updated: UserInfo) => void,
};

export const AdminMemberRow = ({
  member,
  balanceActivity,
  actor,
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
    commissionPercent,
  } = member;

  const {act: actorWithToast} = useUserDataActor({statusToast: true});

  if (!actorWithToast) {
    void signIn();
    return null;
  }

  const isPrivileged = isUserPrivileged(actor);

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
          isUpdatable={isPrivileged}
          active={isAgent}
          disabled={controlDisabled}
          icon={{
            active: <CheckCircleIcon className="size-5"/>,
            inactive: <XCircleIcon className="size-5"/>,
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
            isUpdatable={isPrivileged}
            active={isSuspended}
            disabled={controlDisabled}
            icon={{
              active: <LockClosedIcon className="size-5"/>,
              inactive: <LockOpenIcon className="size-5"/>,
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
      <AdminMemberMonetaryCell value={balanceActivity?.currentBalance}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceActivity?.byTxnType['nftBuy']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceActivity?.byTxnType['nftSell']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceActivity?.byTxnType['deposit.twBank']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceActivity?.byTxnType['deposit.crypto']}/>
      <AdminMemberMonetaryCell applySignStyle value={0}/>
      {
        actor.isAdmin &&
        <AdminMemberCommissionSettingsCell
          initial={commissionPercent}
          isAdmin={isPrivileged}
          disabled={controlDisabled}
          onUpload={async (commissionPercent) => {
            const session = await actorWithToast({
              action: 'request',
              options: {
                type: 'admin.member.update.commission',
                data: {targetId: id, commissionPercent},
              },
            });

            const error = session?.user.jwtUpdateError;
            if (error) {
              onUpdateError(error);
              return;
            }

            onUpdatedMember({...member, commissionPercent});
          }}
        />
      }
      <AdminMemberSingleControls showPopup={showPopup}/>
    </Flex>
  );
};

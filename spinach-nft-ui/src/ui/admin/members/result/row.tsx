import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import LockOpenIcon from '@heroicons/react/24/solid/LockOpenIcon';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {UserInfo} from '@spinach/common/types/common/user/info';
import {signIn} from 'next-auth/react';
import {useTranslations} from 'next-intl';

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
import {isCommissionWritable} from '@spinach/next/ui/admin/members/result/utils';
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
    commissionPercentMember,
  } = member;
  const t = useTranslations('UI.InPage.Admin.Members.Control.Toggle');

  const {act: actorWithToast, status: userActorStatus} = useUserDataActor({statusToast: true});

  if (!actorWithToast) {
    void signIn();
    return null;
  }

  const isPrivileged = isUserPrivileged(actor);

  return (
    <>
      <td className="w-52 justify-center">
        {formatUserName(member)}
      </td>
      <td className="w-20">
        <VerificationStatusUi status={status}/>
      </td>
      <td className="w-16">
        <AdminMemberControlButton
          text={t('Agent')}
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
      </td>
      <td className="w-16">
        {
          !member.isAdmin &&
          <AdminMemberControlButton
            text={isSuspended ? t('Suspended') : t('Normal')}
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
      </td>
      <AdminMemberMonetaryCell value={balanceActivity?.currentBalance}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceActivity?.byTxnType['nftBuy']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceActivity?.byTxnType['nftSell']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceActivity?.byTxnType['deposit.twBank']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceActivity?.byTxnType['deposit.crypto']}/>
      <AdminMemberMonetaryCell applySignStyle value={0}/>
      <td>
        <AdminMemberCommissionSettingsCell
          initial={commissionPercentMember}
          isWritable={isCommissionWritable({type: 'member', permissionFlags: actor})}
          isLoading={userActorStatus === 'processing'}
          onUpload={async (commissionPercentMember) => {
            const session = await actorWithToast({
              action: 'request',
              options: {
                type: 'admin.commission.update.member',
                data: {targetId: id, commissionPercent: commissionPercentMember},
              },
            });

            const error = session?.user.jwtUpdateError;
            if (error) {
              onUpdateError(error);
              return;
            }

            onUpdatedMember({...member, commissionPercentMember});
          }}
        />
      </td>
      <AdminMemberSingleControls showPopup={showPopup}/>
    </>
  );
};

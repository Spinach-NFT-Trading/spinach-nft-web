import React from 'react';

import IdentificationIcon from '@heroicons/react/24/outline/IdentificationIcon';
import {UserData} from '@spinach/common/types/common/user/data';
import {UserInfoListByAgent} from '@spinach/common/types/common/user/info';
import {isNotNullish} from '@spinach/common/utils/type';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {UserBalanceActivityMap} from '@spinach/next/types/mongo/balance';
import {AdminAgentRowCommonProps} from '@spinach/next/ui/admin/agents/result/type';
import {AdminAgentName} from '@spinach/next/ui/admin/common/agent';
import {AdminMemberCommissionSettingsCell} from '@spinach/next/ui/admin/common/cell/commission/main';
import {AdminMemberMonetaryCell} from '@spinach/next/ui/admin/common/cell/monetary/main';
import {getSumOfBalanceActivity} from '@spinach/next/ui/admin/common/utils';
import {isCommissionWritable} from '@spinach/next/ui/admin/members/result/utils';


type Props = AdminAgentRowCommonProps & {
  data: UserInfoListByAgent,
  agent: UserData | null,
  balanceActivityMap: UserBalanceActivityMap,
  onMemberListClick: () => void,
};

export const AdminAgentRow = ({
  actor,
  data,
  agent,
  balanceActivityMap,
  onMemberListClick,
}: Props) => {
  const {agentId, members, commissionPercent} = data;

  const t = useTranslations('UI.InPage.Admin.Agents');

  // Not re-using actor from lookback control because it doesn't show status toast
  const {act, status} = useUserDataActor({statusToast: true});

  const activities = members
    .map(({id}) => balanceActivityMap[id])
    .filter(isNotNullish);

  return (
    <>
      <td className="w-52 justify-center">
        <AdminAgentName agent={agent}/>
      </td>
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
      <td>
        {
          agentId != null &&
          <AdminMemberCommissionSettingsCell
            initial={commissionPercent}
            isWritable={isCommissionWritable({type: 'agent', permissionFlags: actor})}
            isLoading={status === 'processing'}
            onUpload={async (commissionPercent) => {
              if (!act) {
                return;
              }

              await act({
                action: 'request',
                options: {
                  type: 'admin.commission.update.agent',
                  data: {targetId: agentId, commissionPercent},
                },
              });
            }}
          />
        }
      </td>
      <td>
        <FlexButton onClick={onMemberListClick} className={clsx(
          'button-clickable-bg items-center gap-1 whitespace-nowrap p-1',
        )}>
          <IdentificationIcon className="size-6"/>
          <div>{t('LowerLevels')}</div>
        </FlexButton>
      </td>
    </>
  );
};

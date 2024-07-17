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


type Props = AdminAgentRowCommonProps & {
  data: UserInfoListByAgent,
  agent: UserData | null,
  balanceActivityMap: UserBalanceActivityMap,
  onMemberListClick: () => void,
};

export const AdminAgentRow = ({
  isAdmin,
  data,
  agent,
  balanceActivityMap,
  onMemberListClick,
}: Props) => {
  const {members} = data;

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
        <AdminMemberCommissionSettingsCell
          initial={{
            buy: 0,
            sell: 0,
          }}
          isAdmin={isAdmin}
          disabled={status === 'processing'}
          onUpload={async (commissionPercent) => {
            if (!act) {
              return;
            }

            await act({
              action: 'request',
              options: {
                type: 'admin.agent.update.commission',
                data: {agentId: data.agentId, commissionPercent},
              },
            });
          }}
        />
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

import React from 'react';

import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import {UserCommissionPercent} from '@spinach/common/types/common/user/commission';

import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {AdminMemberCommissionSettingsInput} from '@spinach/next/ui/admin/members/result/cell/commission/input';


type Props = {
  initial: UserCommissionPercent,
  isAdmin: boolean,
  disabled: boolean,
  onUpload: (commissionPercent: UserCommissionPercent) => Promise<void>,
};

export const AdminMemberCommissionSettingsCell = ({
  initial,
  isAdmin,
  disabled,
  onUpload,
}: Props) => {
  const [
    commissionPercent,
    setCommissionPercent,
  ] = React.useState(initial);

  const actualDisabled= disabled || !isAdmin;

  return (
    <FlexForm direction="row" noFullWidth className="items-center gap-1">
      <AdminMemberCommissionSettingsInput
        title="買"
        rate={commissionPercent.buy}
        onUpdated={(buy) => setCommissionPercent((original): UserCommissionPercent => ({
          ...original,
          buy,
        }))}
        disabled={actualDisabled}
      />
      <AdminMemberCommissionSettingsInput
        title="賣"
        rate={commissionPercent.sell}
        onUpdated={(sell) => setCommissionPercent((original): UserCommissionPercent => ({
          ...original,
          sell,
        }))}
        disabled={actualDisabled}
      />
      <button
        className="button-clickable-bg rounded-lg p-1"
        onClick={() => onUpload(commissionPercent)}
        disabled={actualDisabled}
      >
        <CloudArrowUpIcon className="h-6 w-6"/>
      </button>
    </FlexForm>
  );
};

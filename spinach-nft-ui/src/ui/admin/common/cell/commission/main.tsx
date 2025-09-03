import React from 'react';

import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import {UserCommissionPercent} from '@spinach/common/types/common/user/commission';
import {useTranslations} from 'next-intl';

import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {AdminMemberCommissionSettingsInput} from '@spinach/next/ui/admin/common/cell/commission/input';


type Props = {
  initial: UserCommissionPercent,
  isWritable: boolean,
  isLoading: boolean,
  onUpload: (commissionPercent: UserCommissionPercent) => Promise<void>,
};

export const AdminMemberCommissionSettingsCell = ({
  initial,
  isWritable,
  isLoading,
  onUpload,
}: Props) => {
  const [
    commissionPercent,
    setCommissionPercent,
  ] = React.useState(initial);

  const t = useTranslations('UI.InPage.Admin.Common.Commission');

  const actualDisabled = !isWritable || isLoading;

  return (
    <FlexForm direction="row" noFullWidth center className="w-60 gap-1">
      <AdminMemberCommissionSettingsInput
        title={t('Buy')}
        rate={commissionPercent.buy}
        onUpdated={(buy) => setCommissionPercent((original): UserCommissionPercent => ({
          ...original,
          buy,
        }))}
        disabled={actualDisabled}
      />
      <AdminMemberCommissionSettingsInput
        title={t('Sell')}
        rate={commissionPercent.sell}
        onUpdated={(sell) => setCommissionPercent((original): UserCommissionPercent => ({
          ...original,
          sell,
        }))}
        disabled={actualDisabled}
      />
      {
        isWritable &&
        <button
          className="button-clickable-bg rounded-lg p-1"
          onClick={() => onUpload(commissionPercent)}
          disabled={actualDisabled}
        >
          <CloudArrowUpIcon className="size-6"/>
        </button>
      }
    </FlexForm>
  );
};

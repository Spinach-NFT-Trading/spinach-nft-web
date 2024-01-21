import React from 'react';

import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';

import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {InputBox} from '@spinach/next/components/shared/common/input/box';


type Props = {
  commissionRate: number,
  setCommissionRate: (commissionRate: number) => void,
  isAdmin: boolean,
  disabled: boolean,
  onUpload: (commissionRate: number) => Promise<void>,
};

export const AdminMemberCommissionSettingsCell = ({
  commissionRate,
  setCommissionRate,
  isAdmin,
  disabled,
  onUpload,
}: Props) => {
  const actualDisabled= disabled || !isAdmin;

  return (
    <FlexForm direction="row" noFullWidth className="w-28 items-center gap-1">
      <InputBox
        value={(commissionRate * 100).toString()}
        type="number"
        className="w-full text-center"
        disabled={actualDisabled}
        onChange={({target}) => {
          if (!target.value) {
            setCommissionRate(0);
          }

          const commissionRate = parseFloat(target.value);

          if (isNaN(commissionRate)) {
            return;
          }

          setCommissionRate(commissionRate / 100);
        }}
      />
      <span>%</span>
      <button
        className="button-clickable-bg rounded-lg p-1"
        onClick={() => onUpload(commissionRate)}
        disabled={actualDisabled}
      >
        <CloudArrowUpIcon className="h-6 w-6"/>
      </button>
    </FlexForm>
  );
};

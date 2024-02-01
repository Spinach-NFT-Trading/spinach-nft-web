import React from 'react';

import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';

import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {InputBox} from '@spinach/next/components/shared/common/input/box';


type Props = {
  initialCommissionRate: number,
  isAdmin: boolean,
  disabled: boolean,
  onUpload: (commissionRate: number) => Promise<void>,
};

export const AdminMemberCommissionSettingsCell = ({
  initialCommissionRate,
  isAdmin,
  disabled,
  onUpload,
}: Props) => {
  const [commissionRate, setCommissionRate] = React.useState(initialCommissionRate);

  const actualDisabled= disabled || !isAdmin;

  return (
    <FlexForm direction="row" noFullWidth className="w-28 items-center gap-1">
      <InputBox
        value={(commissionRate * 100).toString()}
        type="number"
        className="w-full text-center"
        disabled={actualDisabled}
        min={0}
        max={10}
        step={0.1}
        onChange={({target}) => {
          if (!target.value) {
            setCommissionRate(0);
            return;
          }

          const commissionRate = parseFloat(Number(target.value).toFixed(1));

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

import React from 'react';

import {InputBox} from '@spinach/next/components/shared/common/input/box';


type Props = {
  title: React.ReactNode,
  rate: number,
  onUpdated: (rate: number) => void,
  disabled: boolean,
};

export const AdminMemberCommissionSettingsInput = ({
  title,
  rate,
  onUpdated,
  disabled,
}: Props) => {
  return (
    <>
      <span>{title}</span>
      <InputBox
        value={Number(rate).toString()}
        type="number"
        className="w-12 text-center"
        disabled={disabled}
        min={0}
        max={10}
        step={0.1}
        onChange={({target}) => {
          if (!target.value) {
            onUpdated(0);
            return;
          }

          const commissionPercent = parseFloat(Number(target.value).toFixed(1));

          if (isNaN(commissionPercent)) {
            return;
          }

          onUpdated(commissionPercent);
        }}
      />
      <span>%</span>
    </>
  );
};

import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {InputBox} from '@spinach/next/components/shared/common/input/box';


type Props = {
  title: string,
  value: number,
  onChange: (value: number) => void,
};

export const AdminGlobalConfigNumberInput = ({title, value, onChange}: Props) => {
  return (
    <Flex direction="row" className="gap-2">
      <span className="w-28 text-center">{title}</span>
      <InputBox
        type="number"
        value={Number(value).toString()}
        onChange={({target}) => onChange(parseFloat(Number(target.value).toFixed(1)))}
      />
    </Flex>
  );
};

import React from 'react';

import {Nullable} from '@spinach/common/types/common/typing';
import {clsx} from 'clsx';

import {adminMemberMonetaryCellStyle} from '@spinach/next/ui/admin/common/cell/monetary/const';
import {formatInt} from '@spinach/next/utils/number/format';


type Props = {
  value: Nullable<number>,
  applySignStyle?: boolean,
};

export const AdminMemberMonetaryCell = ({value, applySignStyle}: Props) => {
  return (
    <td className={clsx(
      value ? 'items-center justify-end gap-1' : 'justify-center',
      value && applySignStyle && value > 0 && 'text-green-300',
      value && applySignStyle && value < 0 && 'text-red-300',
      adminMemberMonetaryCellStyle,
    )}>
      {value ?
        <>
          {formatInt(value)}
          <span>G</span>
        </> :
        '-'}
    </td>
  );
};

import {Nullable} from '@spinach/common/types/common/typing';

import {NumberInputValueType} from '@spinach/next/components/shared/common/input/number/type';
import {formatFloatOptional} from '@spinach/next/utils/number/format/optional';
import {formatInt} from '@spinach/next/utils/number/format/regular';


type GetNumberInputFormattedValueOpts = {
  value: Nullable<number>,
  valueType?: NumberInputValueType,
  focused: boolean,
};

export const getNumberInputFormattedValue = ({
  value,
  valueType,
  focused,
}: GetNumberInputFormattedValueOpts): string => {
  if (value == null) {
    return '';
  }

  if (valueType === undefined || valueType === 'integer') {
    return focused ? value.toString() : formatInt(value);
  }

  if (valueType === 'float') {
    return formatFloatOptional({num: value, decimals: 2}).toString();
  }

  if (valueType === 'original') {
    return value.toString();
  }

  throw new Error(
    `Unhandled value (${value}) of value type (${valueType satisfies never} for formatted value of number input`,
  );
};

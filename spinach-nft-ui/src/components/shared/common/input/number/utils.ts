import {type HTMLAttributes} from 'react';

import {Nullable} from '@spinach/common/types/common/typing';

import {NumberInputValueType} from '@spinach/next/components/shared/common/input/number/type';


type GetNumberInputLimitedValueOpts = {
  value: number,
  min?: number,
  max?: number,
};

export const getNumberInputLimitedValue = ({min, max, value}: GetNumberInputLimitedValueOpts): number => {
  return Math.max(min ?? -Infinity, Math.min(max ?? Infinity, value));
};

type GetNumberInputParsedValueOpts = {
  valueString: string,
  isRequired: boolean,
  valueType?: NumberInputValueType,
  min?: number,
  max?: number,
};

export const getNumberInputParsedValue = ({
  valueString,
  valueType = 'integer',
  isRequired,
  min,
  max,
}: GetNumberInputParsedValueOpts): number | null => {
  // Normalize spacing/commas and case
  valueString = valueString.replaceAll(',', '').replaceAll(' ', '').toUpperCase();

  // Validate decimal points
  const dots = valueString.match(/\./g)?.length ?? 0;
  if (dots > 1) {
    return null;
  }

  // Handle K/M/B suffix as multipliers (at the end of the string)
  let multiplier = 1;
  const suffixMatch = valueString.match(/([KMB])$/);
  if (suffixMatch) {
    const suffix = suffixMatch[1];
    if (suffix === 'K') {
      multiplier = 1_000;
    } else if (suffix === 'M') {
      multiplier = 1_000_000;
    } else if (suffix === 'B') {
      multiplier = 1_000_000_000;
    }

    valueString = valueString.slice(0, -1);
  }

  // parseFloat naturally supports scientific notation like 1.23E4
  let value = parseFloat(valueString);

  if (isNaN(value)) {
    return isRequired ? 0 : null;
  }

  value *= multiplier;

  // Limit after applying multiplier
  value = getNumberInputLimitedValue({min, max, value});

  if (valueType === 'integer') {
    // Truncate towards zero for integers
    value = Math.trunc(value);
  }

  return value;
};

export const getHtmlNumberInputMode = (
  valueType: Nullable<NumberInputValueType>,
): HTMLAttributes<HTMLInputElement>['inputMode'] => {
  if (valueType == null) {
    return 'decimal';
  }

  if (valueType === 'integer') {
    return 'numeric';
  }

  if (valueType === 'float' || valueType === 'original') {
    return 'decimal';
  }

  throw new Error(`Unhandled value type for getting HTML number input mode: ${valueType satisfies never}`);
};

import {Nullable} from '@spinach/common/types/common/typing';
import {isNotNullish} from '@spinach/common/utils/type';


const formatter = {
  float3: new Intl.NumberFormat(undefined, {minimumFractionDigits: 3, maximumFractionDigits: 3}),
  float2: new Intl.NumberFormat(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
  int: new Intl.NumberFormat(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}),
};

export const formatFloat3 = (num: Nullable<number>): string => {
  if (isNotNullish(num)) {
    return formatter.float3.format(num);
  }

  return '-';
};

export const formatFloat2 = (num: Nullable<number>): string => {
  if (isNotNullish(num)) {
    return formatter.float2.format(num);
  }

  return '-';
};

export const formatInt = (num: Nullable<number>): string => {
  if (isNotNullish(num)) {
    return formatter.int.format(num);
  }

  return '-';
};

type FormatToAbbreviationOpts = {
  num: Nullable<number>,
  decimals?: number,
};

export const formatToAbbreviation = ({num, decimals}: FormatToAbbreviationOpts): string => {
  if (!num) {
    return '-';
  }

  const numForCheck = Math.abs(num); // Need check the case of negative
  decimals = decimals ?? 2;

  if (numForCheck >= 1E9) {
    return `${(num / 1E9).toFixed(decimals)} B`;
  }

  if (numForCheck >= 1E6) {
    return `${(num / 1E6).toFixed(decimals)} M`;
  }

  if (numForCheck >= 1E3) {
    return `${(num / 1E3).toFixed(decimals)} K`;
  }

  return parseFloat(num.toFixed(decimals)).toString();
};

import {isNotNullish} from '@spinach/next/utils/type';


const formatter = {
  float3: new Intl.NumberFormat(undefined, {minimumFractionDigits: 3, maximumFractionDigits: 3}),
  float2: new Intl.NumberFormat(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
  int: new Intl.NumberFormat(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}),
};

export const formatFloat3 = (num: number | null | undefined): string | null => {
  if (isNotNullish(num)) {
    return formatter.float3.format(num);
  }

  return '-';
};

export const formatFloat2 = (num: number | null | undefined): string | null => {
  if (isNotNullish(num)) {
    return formatter.float2.format(num);
  }

  return '-';
};

export const formatInt = (num: number | null | undefined): string | null => {
  if (isNotNullish(num)) {
    return formatter.int.format(num);
  }

  return '-';
};

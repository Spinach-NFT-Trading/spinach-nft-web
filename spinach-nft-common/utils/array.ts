import {Nullable} from '@spinach/common/types/common/typing';
import {isNotNullish} from '@spinach/common/utils/type';


export const toUnique = <T>(arr: T[]): T[] => Array.from(new Set(arr));

export const toSum = (arr: number[]): number => arr.reduce((prev, curr) => prev + curr, 0);

export const toNonNullishArray = <TItem>(item: Nullable<TItem>[]): TItem[] => {
  return item.filter(isNotNullish);
};

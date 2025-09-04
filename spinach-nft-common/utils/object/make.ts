import {Nullable} from '@spinach/common/types/common/typing';
import {isNotNullish} from '@spinach/common/utils/type';


export const toObject = <TItem, TValue, TOnNull = {[key in PropertyKey]?: TValue}>(
  items: readonly TItem[],
  getEntry: (item: TItem, idx: number) => Nullable<readonly [PropertyKey, TValue]>,
  onEmpty?: () => TOnNull,
): {[p in string]?: TValue} | TOnNull => {
  const entries = items
    .map((item, idx) => {
      const entry = getEntry(item, idx);
      if (!entry) {
        return null;
      }

      return entry;
    })
    .filter(isNotNullish);
  if (entries.length === 0) {
    // `onEmpty?.() ?? {}` would cause a bug where `onEmpty()` is returning null, empty object is returned instead
    return onEmpty ? onEmpty() : {};
  }

  return Object.fromEntries<TValue>(entries);
};

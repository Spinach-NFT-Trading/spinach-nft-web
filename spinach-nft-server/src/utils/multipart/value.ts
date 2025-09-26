import {ApiErrorCode} from '@spinach/common/types/api/error';

import {GetMultipartValueBaseOpts} from '@spinach/server/utils/multipart/type';


type GetMultipartValueOpts<T> = GetMultipartValueBaseOpts & {
  castValue: (value: unknown) => T | null,
};

export const getMultipartValue = <T>({
  multipart,
  castValue,
}: GetMultipartValueOpts<T>): {casted: T} | ApiErrorCode => {
  if (multipart == null) {
    return 'multipartFieldEmpty';
  }

  if (Array.isArray(multipart)) {
    return 'multipartTooManyValues';
  }

  if (multipart.type !== 'field') {
    return 'multipartFieldNotValue';
  }

  const casted = castValue(multipart.value);
  if (casted == null) {
    return 'multipartFieldValueCastFailed';
  }

  return {casted};
};

type GetMultipartValueAsStringOpts = GetMultipartValueBaseOpts;

export const getMultipartValueAsString = ({
  multipart,
}: GetMultipartValueAsStringOpts) => {
  return getMultipartValue({
    multipart,
    castValue: (value) => typeof value === 'string' ? value : null,
  });
};

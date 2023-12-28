import React from 'react';

import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';
import clsx from 'clsx';

import {
  AccountIdVerificationCommonProps,
  AccountIdVerificationState,
} from '@spinach/next/components/shared/account/idVerification/type';
import {InputFileImageOnly} from '@spinach/next/components/shared/common/input/file/image';
import {accountIdVerificationTypeText} from '@spinach/next/const/account';


type Props = AccountIdVerificationCommonProps & {
  type: AccountIdVerificationType,
};

export const AccountIdVerificationInput = ({
  type,
  state,
  setState,
  onSelected,
}: Props) => {
  const {error} = state;
  const errorMessage = error[type];

  return (
    <InputFileImageOnly
      id={type}
      title={`${accountIdVerificationTypeText[type]}${errorMessage ? ` - ${errorMessage}` : ''}`}
      className={clsx(errorMessage && 'text-red-400')}
      onFileSelected={(data) => onSelected(type, data)}
      onFileTypeIncorrect={(type) => setState((original) => ({
        ...original,
        error: {
          ...original.error,
          [type]: `檔案種類不正確: ${type}`,
        },
      } satisfies AccountIdVerificationState))}
      required
    />
  );
};

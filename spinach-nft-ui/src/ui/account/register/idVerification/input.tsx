import React from 'react';

import {accountIdVerificationTypeText} from '@spinach/common/const/auth';
import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';
import clsx from 'clsx';

import {InputFileImageOnly} from '@spinach/next/components/shared/common/input/file/image';
import {AccountRegisterIdVerificationState} from '@spinach/next/ui/account/register/idVerification/type';
import {AccountRegisterCommonProps, AccountRegisterInput} from '@spinach/next/ui/account/register/type';


type Props = AccountRegisterCommonProps & {
  type: AccountIdVerificationType,
  state: AccountRegisterIdVerificationState,
  setState: React.Dispatch<React.SetStateAction<AccountRegisterIdVerificationState>>,
};

export const AccountRegisterIdVerificationInput = ({setInput, type, state, setState}: Props) => {
  const {error} = state;
  const errorMessage = error[type];

  return (
    <InputFileImageOnly
      id={type}
      title={`${accountIdVerificationTypeText[type]}${errorMessage ? ` - ${errorMessage}` : ''}`}
      className={clsx(errorMessage && 'text-red-400')}
      onFileSelected={(data) => setInput((original) => ({
        ...original,
        image: {
          ...original.image,
          [type]: data,
        },
      } satisfies AccountRegisterInput))}
      onFileTypeIncorrect={(type) => setState((original) => ({
        ...original,
        error: {
          ...original.error,
          [type]: `檔案種類不正確: ${type}`,
        },
      } satisfies AccountRegisterIdVerificationState))}
      required
    />
  );
};

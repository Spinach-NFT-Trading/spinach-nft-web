import React from 'react';

import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

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

  const t = useTranslations('UI.Component.AccountIdVerificationForm.Error');

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
          [type]: t('IncorrectFileType', {type}),
        },
      } satisfies AccountIdVerificationState))}
      required
    />
  );
};

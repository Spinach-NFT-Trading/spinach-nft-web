import React from 'react';

import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {
  AccountIdVerificationCommonProps,
  AccountIdVerificationState,
} from '@spinach/next/components/shared/account/idVerification/type';
import {InputFileImageOnly} from '@spinach/next/components/shared/common/input/file/image';
import {accountIdVerificationTypeI18nId} from '@spinach/next/const/account';


type Props = AccountIdVerificationCommonProps & {
  type: AccountIdVerificationType,
  isCompleted?: boolean,
};

export const AccountIdVerificationInput = ({
  type,
  isCompleted,
  state,
  setState,
  onSelected,
}: Props) => {
  const {error} = state;
  const errorMessage = error[type];

  const t = useTranslations('UI.Error.Input');
  const t2 = useTranslations('UI.Account.IdType');

  return (
    <InputFileImageOnly
      id={type}
      title={`${t2(accountIdVerificationTypeI18nId[type])}${errorMessage ? ` - ${errorMessage}` : ''}`}
      className={clsx(errorMessage && 'text-red-400')}
      classOfTitle={clsx(isCompleted && 'text-green-400')}
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

import React from 'react';

import {accountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {AccountIdVerificationInput} from '@spinach/next/components/shared/account/idVerification/input';
import {AccountIdVerificationCommonProps} from '@spinach/next/components/shared/account/idVerification/type';
import {AccountRegisterVerificationUploadStatus} from '@spinach/next/ui/account/register/type';


type Props = AccountIdVerificationCommonProps & {
  uploading: boolean,
  uploadStatus: AccountRegisterVerificationUploadStatus,
  isNotReady: boolean,
  onComplete: () => void,
  submitButtonText: string,
  className?: string,
};

export const AccountIdVerificationForm = ({
  uploading,
  uploadStatus,
  isNotReady,
  onComplete,
  submitButtonText,
  className,
  ...props
}: Props) => {
  const t = useTranslations('UI.Component.AccountIdVerificationForm');

  return (
    <FlexForm className={clsx('gap-2', className)} onSubmit={onComplete}>
      {accountIdVerificationType.map((type) => (
        <Flex key={type} direction="row" className="items-center gap-1">
          <AccountIdVerificationInput
            key={type}
            type={type}
            isCompleted={uploadStatus[type]}
            {...props}
          />
        </Flex>
      ))}
      <button
        type="submit" className="enabled:button-clickable-bg disabled:button-disabled w-full p-2"
        disabled={uploading || isNotReady}
      >
        {uploading ? t('Uploading') : submitButtonText}
      </button>
    </FlexForm>
  );
};

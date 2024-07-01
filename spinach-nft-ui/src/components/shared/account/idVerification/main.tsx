import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {AccountIdVerificationInput} from '@spinach/next/components/shared/account/idVerification/input';
import {AccountIdVerificationCommonProps} from '@spinach/next/components/shared/account/idVerification/type';


type Props = AccountIdVerificationCommonProps & {
  uploading: boolean,
  isNotReady: boolean,
  onComplete: () => void,
  submitButtonText: string,
  className?: string,
};

export const AccountIdVerificationForm = ({
  uploading,
  isNotReady,
  onComplete,
  submitButtonText,
  className,
  ...props
}: Props) => {
  const t = useTranslations('UI.Component.AccountIdVerificationForm');

  return (
    <FlexForm className={clsx('gap-2', className)} onSubmit={onComplete}>
      <AccountIdVerificationInput
        type="idFront"
        {...props}
      />
      <AccountIdVerificationInput
        type="idBack"
        {...props}
      />
      <AccountIdVerificationInput
        type="secondaryFront"
        {...props}
      />
      <AccountIdVerificationInput
        type="handheld"
        {...props}
      />
      <button
        type="submit" className="enabled:button-clickable-bg disabled:button-disabled w-full p-2"
        disabled={uploading || isNotReady}
      >
        {uploading ? t('Uploading') : submitButtonText}
      </button>
    </FlexForm>
  );
};

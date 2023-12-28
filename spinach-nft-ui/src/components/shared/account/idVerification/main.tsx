import React from 'react';

import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {AccountIdVerificationInput} from '@spinach/next/components/shared/account/idVerification/input';
import {AccountIdVerificationCommonProps} from '@spinach/next/components/shared/account/idVerification/type';


type Props = AccountIdVerificationCommonProps & {
  uploading: boolean,
  isNotReady: boolean,
  onComplete: () => void,
  submitButtonText: string,
};

export const AccountIdVerificationForm = ({
  uploading,
  isNotReady,
  onComplete,
  submitButtonText,
  ...props
}: Props) => {
  return (
    <FlexForm className="gap-2" onSubmit={onComplete}>
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
        {uploading ? '上傳中...' : submitButtonText}
      </button>
    </FlexForm>
  );
};

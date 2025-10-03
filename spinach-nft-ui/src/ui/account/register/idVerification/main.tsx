import React from 'react';

import {useTranslations} from 'next-intl';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {initialAccountIdVerificationState} from '@spinach/next/components/shared/account/idVerification/const';
import {AccountIdVerificationForm} from '@spinach/next/components/shared/account/idVerification/main';
import {AccountIdVerificationState} from '@spinach/next/components/shared/account/idVerification/type';
import {AccountRegisterCommonProps, AccountRegisterInput} from '@spinach/next/ui/account/register/type';
import {AccountVerificationUploadStatus} from '@spinach/next/ui/account/verificationUpload';


type Props = AccountRegisterCommonProps & {
  uploading: boolean,
  uploadStatus: AccountVerificationUploadStatus,
};

export const AccountRegisterIdVerification = ({
  uploading,
  uploadStatus,
  ...props
}: Props) => {
  const {show, input, setInput, onComplete} = props;

  const t = useTranslations('UI.UserControl');

  const [state, setState] = React.useState<AccountIdVerificationState>(
    initialAccountIdVerificationState,
  );

  return (
    <AnimatedCollapse show={show}>
      <AccountIdVerificationForm
        state={state}
        setState={setState}
        onSelected={(type, data) => setInput((original) => ({
          ...original,
          imageFileRefs: {
            ...original.imageFileRefs,
            [type]: data,
          },
        } satisfies AccountRegisterInput))}
        uploading={uploading}
        uploadStatus={uploadStatus}
        isNotReady={Object.values(input.imageFileRefs).some((data) => !data)}
        onComplete={onComplete}
        submitButtonText={t('Register')}
      />
    </AnimatedCollapse>
  );
};

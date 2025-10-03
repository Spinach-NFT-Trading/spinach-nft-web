'use client';
import React from 'react';

import {UserIdVerificationUploadIdMap} from '@spinach/common/types/api/auth/register';
import {accountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {initialAccountIdVerificationState} from '@spinach/next/components/shared/account/idVerification/const';
import {AccountIdVerificationForm} from '@spinach/next/components/shared/account/idVerification/main';
import {useI18nApiErrorTranslator} from '@spinach/next/hooks/i18n/apiError/main';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {AccountVerificationUploadStatus} from '@spinach/next/ui/account/verificationUpload';
import {AccountIdVerifyState} from '@spinach/next/ui/account/verify/id/type';
import {uploadFile} from '@spinach/next/utils/api/fileUpload';


type Props = {
  fileUploadGrantId: string,
};

export const AccountIdVerifyClient = ({fileUploadGrantId}: Props) => {
  const {act, status} = useUserDataActor();
  const [state, setState] = React.useState<AccountIdVerifyState>({
    form: initialAccountIdVerificationState,
    fileUploadGrantId,
    errorMessage: null,
  });
  const [uploadIdMap, setUploadIdMap] = React.useState<UserIdVerificationUploadIdMap>({
    idFront: null,
    idBack: null,
    handheld: null,
    secondaryFront: null,
  });
  const {push} = useRouter();

  const t = useTranslations('UI.InPage.Account.Verify.Id');

  const translateApiError = useI18nApiErrorTranslator();

  const onComplete = async () => {
    if (!act) {
      await signIn();
      return;
    }

    // Can't send 4 file refs at once, or the `fetch()` call will stuck
    try {
      await Promise.all(accountIdVerificationType.map(async (verificationType) => {
        const fileRef = state.form.fileRefs[verificationType];
        if (!fileRef) {
          return;
        }

        const response = await uploadFile({fileRef, grantId: fileUploadGrantId});
        if (!response.success) {
          setState((original) => ({
            ...original,
            errorMessage: (
              `Failed to upload ID verification images: ${verificationType} (${translateApiError(response.error)})`
            ),
          }));
          return;
        }

        setUploadIdMap((original) => ({
          ...original,
          [verificationType]: response.data.uploadId,
        }));
      }));
    } catch (error) {
      console.error('Failed to upload ID verification images:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload ID verification images');
      throw error;
    }

    const session = await act({
      action: 'request',
      options: {
        type: 'user.account.verify.id',
        data: uploadIdMap,
      },
    });

    const error = session?.user.jwtUpdateError;
    if (!error) {
      push('/account/profile');
      return;
    }

    setState((original) => ({
      ...original,
      error,
    }));
  };

  return (
    <Flex className="items-center">
      <AccountIdVerificationForm
        state={state.form}
        setState={(getUpdated) => setState(({form, ...original}) => ({
          ...original,
          form: getUpdated(form),
        }))}
        onSelected={(type, fileRef) => setState(({form, ...original}) => ({
          ...original,
          form: {
            ...form,
            fileRefs: {
              ...form.fileRefs,
              [type]: fileRef,
            },
          },
        } satisfies AccountIdVerifyState))}
        uploading={status === 'processing'}
        uploadStatus={Object.fromEntries(
          accountIdVerificationType.map((type) => [
            type,
            uploadIdMap[type] != null,
          ]),
        ) as AccountVerificationUploadStatus}
        isNotReady={Object.values(uploadIdMap).some((image) => !image)}
        onComplete={onComplete}
        submitButtonText={t('Submit')}
        className="md:w-1/2 lg:w-1/3"
      />
    </Flex>
  );
};

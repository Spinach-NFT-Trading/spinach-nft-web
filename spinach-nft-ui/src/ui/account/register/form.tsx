import React from 'react';

import {apiPath} from '@spinach/common/const/path';
import {UserRegisterRequest, UserRegisterResponse} from '@spinach/common/types/api/auth/register';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {FileUploadResponse} from '@spinach/common/types/api/file/upload';
import {accountIdVerificationType, AccountIdVerificationType} from '@spinach/common/types/api/profile/id';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {AccountRegisterCompleted} from '@spinach/next/ui/account/register/completed/main';
import {useAccountRegisterContext} from '@spinach/next/ui/account/register/context/hook';
import {AccountRegisterIdVerification} from '@spinach/next/ui/account/register/idVerification/main';
import {AccountRegisterBasicInfo} from '@spinach/next/ui/account/register/info/main';
import {AccountRegisterInput} from '@spinach/next/ui/account/register/type';
import {AccountVerificationUploadStatus} from '@spinach/next/ui/account/verificationUpload';
import {sendApiPost} from '@spinach/next/utils/api/common';
import {uploadFile} from '@spinach/next/utils/api/fileUpload';


type Props = {
  setError: (error: ApiErrorCode | null) => void,
};

export const AccountRegisterForm = ({
  setError,
}: Props) => {
  const {agent, fileUploadGrantId} = useAccountRegisterContext();

  const [uploading, setUploading] = React.useState(false);
  const [input, setInput] = React.useState<AccountRegisterInput>({
    step: 'info',
    recruitedBy: agent ?? null,
    // Step 2 - Basic info
    idNumber: '',
    name: '',
    email: '',
    birthday: '1990-01-01',
    lineId: '',
    wallet: '',
    username: '',
    phone: '',
    password: '',
    // Step 3 - ID verification
    imageFileRefs: {
      idFront: null,
      idBack: null,
      secondaryFront: null,
      handheld: null,
    },
  });

  const [uploadStatus, setUploadStatus] = React.useState<AccountVerificationUploadStatus>({
    idFront: false,
    idBack: false,
    secondaryFront: false,
    handheld: false,
  });

  const {step} = input;

  const onSubmit = async () => {
    setUploading(true);

    // Can't send 4 file refs at once, or the `fetch()` call will stuck
    const imageUploadResultMap: {[type in AccountIdVerificationType]?: FileUploadResponse} = {};
    try {
      await Promise.all(accountIdVerificationType.map(async (verificationType) => {
        const fileRef = input.imageFileRefs[verificationType];
        if (!fileRef) {
          return;
        }

        imageUploadResultMap[verificationType] = await uploadFile({fileRef, grantId: fileUploadGrantId});
      }));
    } catch (error) {
      console.error('Failed to upload ID verification images:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload ID verification images');
      throw error;
    }

    const imageUploadIdMap: {[type in AccountIdVerificationType]?: string} = {};
    for (const verificationType of accountIdVerificationType) {
      const uploadResponse = imageUploadResultMap[verificationType];
      if (uploadResponse == null) {
        continue;
      }

      if (!uploadResponse.success) {
        setError(uploadResponse.error);

        if (uploadResponse.error === 'fileUploadGrantActivationFailed') {
          alert(fileUploadGrantId);
        }

        setInput((original) => ({
          ...original,
          step: 'idVerification',
        } satisfies AccountRegisterInput));
        return;
      }

      imageUploadIdMap[verificationType] = uploadResponse.data.uploadId;
      setUploadStatus((original) => ({
        ...original,
        [verificationType]: true,
      }));
    }

    // Create registration payload with upload IDs
    const registrationPayload: UserRegisterRequest = {
      recruitedBy: input.recruitedBy,
      idNumber: input.idNumber,
      name: input.name,
      email: input.email,
      birthday: input.birthday,
      lineId: input.lineId,
      wallet: input.wallet,
      username: input.username,
      phone: input.phone,
      password: input.password,
      imageUploadIdMap,
    };

    // Send registration with upload IDs
    const response = await sendApiPost<UserRegisterResponse>({
      path: apiPath.auth.register,
      data: registrationPayload,
    });
    setUploading(false);

    if (!response.success) {
      setError(response.error);
      setInput((original) => ({
        ...original,
        step: 'info',
      } satisfies AccountRegisterInput));
      return;
    }

    setError(null);
    setInput((original) => ({
      ...original,
      step: 'completed',
    } satisfies AccountRegisterInput));
  };

  return (
    <Flex className="gap-2">
      <AccountRegisterBasicInfo
        show={step === 'info'}
        input={input}
        setInput={setInput}
        onComplete={() => (
          setInput((original) => ({
            ...original,
            step: 'idVerification',
          } satisfies AccountRegisterInput))
        )}
      />
      <AccountRegisterIdVerification
        show={step === 'idVerification'}
        uploading={uploading}
        input={input}
        setInput={setInput}
        uploadStatus={uploadStatus}
        onComplete={() => onSubmit().catch((error) => {
          console.error(error);
          if (error instanceof Error) {
            alert(`${error.message}\n\nStack trace:\n${error.stack}`);
          } else {
            alert(String(error));
          }
        })}
      />
      <AccountRegisterCompleted show={step === 'completed'}/>
    </Flex>
  );
};

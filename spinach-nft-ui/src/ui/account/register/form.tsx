import React from 'react';

import {apiPath} from '@spinach/common/const/path';
import {UserRegisterResponse} from '@spinach/common/types/api/auth/register';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {AccountRegisterCompleted} from '@spinach/next/ui/account/register/completed/main';
import {AccountRegisterIdVerification} from '@spinach/next/ui/account/register/idVerification/main';
import {AccountRegisterBasicInfo} from '@spinach/next/ui/account/register/info/main';
import {AccountRegisterSmsVerification} from '@spinach/next/ui/account/register/sms/main';
import {AccountRegisterFormProps, AccountRegisterInput} from '@spinach/next/ui/account/register/type';
import {sendApiPost} from '@spinach/next/utils/api/common';


export const AccountRegisterForm = ({agent, setError}: AccountRegisterFormProps) => {
  const [uploading, setUploading] = React.useState(false);
  const [input, setInput] = React.useState<AccountRegisterInput>({
    step: 'sms',
    recruitedBy: agent ?? null,
    // Step 1 - SMS
    phoneVerificationKey: '',
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
    image: {
      idFront: null,
      idBack: null,
      secondaryFront: null,
      handheld: null,
    },
  });

  const {step} = input;

  const onSubmit = async () => {
    setUploading(true);
    const response = await sendApiPost<UserRegisterResponse>({
      path: apiPath.auth.register,
      data: input,
    });
    setUploading(false);

    if (response.success) {
      setError(null);
      setInput((original) => ({
        ...original,
        step: 'completed',
      } satisfies AccountRegisterInput));
      return;
    }

    setError(response.error);
    setInput((original) => ({
      ...original,
      step: 'info',
    } satisfies AccountRegisterInput));
  };

  return (
    <Flex className="gap-2">
      <AccountRegisterSmsVerification
        show={step === 'sms'}
        onPhoneVerified={({key, phone}) => (
          setInput((original) => ({
            ...original,
            step: 'info',
            phoneVerificationKey: key,
            phone,
          } satisfies AccountRegisterInput))
        )}
      />
      <AccountRegisterBasicInfo
        show={step === 'info'}
        input={input}
        setInput={setInput}
        onComplete={() =>(
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
        onComplete={onSubmit}
      />
      <AccountRegisterCompleted show={step === 'completed'}/>
    </Flex>
  );
};

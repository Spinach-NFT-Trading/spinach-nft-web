import React from 'react';

import {apiPath} from '@spinach/common/const/path';
import {UserRegisterResponse} from '@spinach/common/types/api/auth/register';
import {ApiErrorCode} from '@spinach/common/types/api/error';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {AccountRegisterCompleted} from '@spinach/next/ui/account/register/completed/main';
import {AccountRegisterIdVerification} from '@spinach/next/ui/account/register/idVerification/main';
import {AccountRegisterBasicInfo} from '@spinach/next/ui/account/register/info/main';
import {AccountRegisterSmsVerification} from '@spinach/next/ui/account/register/sms/main';
import {AccountRegisterInput} from '@spinach/next/ui/account/register/type';
import {sendApiPost} from '@spinach/next/utils/api/common';


type Props = {
  setError: (error: ApiErrorCode) => void,
};

export const AccountRegisterForm = ({setError}: Props) => {
  const [input, setInput] = React.useState<AccountRegisterInput>({
    step: 'sms',
    // Step 1 - SMS
    phoneVerificationKey: '',
    // Step 2 - Basic info
    name: '',
    email: '',
    birthday: '1990-01-01',
    lineId: '',
    wallet: '',
    username: '',
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
    const response = await sendApiPost<UserRegisterResponse>({
      path: apiPath.auth.register,
      data: input,
    });

    if (response.success) {
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
      <AccountRegisterSmsVerification show={step === 'sms'} onPhoneVerified={(phoneVerificationKey) => (
        setInput((original) => ({
          ...original,
          step: 'info',
          phoneVerificationKey,
        } satisfies AccountRegisterInput))
      )}/>
      <AccountRegisterBasicInfo show={step === 'info'} input={input} setInput={setInput} onComplete={() =>(
        setInput((original) => ({
          ...original,
          step: 'idVerification',
        } satisfies AccountRegisterInput))
      )}/>
      <AccountRegisterIdVerification
        show={step === 'idVerification'}
        input={input}
        setInput={setInput}
        onComplete={async () => {
          await onSubmit();
        }}
      />
      <AccountRegisterCompleted show={step === 'completed'}/>
    </Flex>
  );
};

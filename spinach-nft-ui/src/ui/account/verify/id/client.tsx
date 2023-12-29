'use client';
import React from 'react';

import {UserIdVerificationData} from '@spinach/common/types/api/auth/verify/id/main';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {initialAccountIdVerificationState} from '@spinach/next/components/shared/account/idVerification/const';
import {AccountIdVerificationForm} from '@spinach/next/components/shared/account/idVerification/main';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {AccountIdVerifyState} from '@spinach/next/ui/account/verify/id/type';


export const AccountIdVerifyClient = () => {
  const {act, status} = useUserDataActor();
  const [state, setState] = React.useState<AccountIdVerifyState>({
    form: initialAccountIdVerificationState,
    errorMessage: null,
  });
  const [data, setData] = React.useState<UserIdVerificationData>({
    idFront: null,
    idBack: null,
    handheld: null,
    secondaryFront: null,
  });
  const {push} = useRouter();

  const onComplete = async () => {
    if (!act) {
      await signIn();
      return;
    }

    const session = await act({
      action: 'request',
      options: {
        type: 'user.account.verify.id',
        data,
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
        onSelected={(type, data) => setData((original) => ({
          ...original,
          [type]: data,
        } satisfies UserIdVerificationData))}
        uploading={status === 'processing'}
        isNotReady={Object.values(data).some((image) => !image)}
        onComplete={onComplete}
        submitButtonText="提交"
        className="md:w-1/2 lg:w-1/3"
      />
    </Flex>
  );
};

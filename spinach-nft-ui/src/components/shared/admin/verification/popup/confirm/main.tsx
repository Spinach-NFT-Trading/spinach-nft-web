import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {signIn} from 'next-auth/react';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {UserDataRequestOpts} from '@spinach/next/types/userData/upload';


type Props = {
  onVerified: () => void,
  onError: (error: ApiErrorCode) => void,
  getConfirmPayload: (pass: boolean) => UserDataRequestOpts,
};

export const AdminVerificationConfirmPopup = ({
  onVerified,
  onError,
  getConfirmPayload,
}: Props) => {
  const {act} = useUserDataActor();

  const onClickVerify = (pass: boolean) => async () => {
    if (!act) {
      await signIn();
      return;
    }

    const session = await act({
      action: 'request',
      options: getConfirmPayload(pass),
    });
    const error = session?.user.jwtUpdateError;
    if (!error) {
      onVerified();
      return;
    }

    onError(error);
  };

  return (
    <Flex center className="gap-2 sm:w-96">
      <div className="text-xl">
        確認驗證
      </div>
      <hr className="w-full"/>
      <FlexButton
        center
        noFullWidth={false}
        className="button-base button-text-hover h-24 gap-1 bg-green-700 p-2 text-3xl hover:bg-green-300"
        onClick={onClickVerify(true)}
      >
        <CheckCircleIcon className="size-9"/>
        <div>通過</div>
      </FlexButton>
      <FlexButton
        center
        noFullWidth={false}
        className="button-base button-text-hover h-24 gap-1 bg-red-800 p-2 text-3xl hover:bg-red-300"
        onClick={onClickVerify(false)}
      >
        <XCircleIcon className="size-9"/>
        <div>駁回</div>
      </FlexButton>
    </Flex>
  );
};

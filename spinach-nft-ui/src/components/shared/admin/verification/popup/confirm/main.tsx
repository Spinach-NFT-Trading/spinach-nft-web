import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {translateApiError} from '@spinach/common/utils/translate/apiError';
import {signIn} from 'next-auth/react';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {
  AdminVerificationCollapsibleProps,
  AdminVerificationCollapsibleState,
} from '@spinach/next/components/shared/admin/verification/type';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';


type Props<TData> = AdminVerificationCollapsibleProps<TData> & {
  state: AdminVerificationCollapsibleState,
  setState: React.Dispatch<React.SetStateAction<AdminVerificationCollapsibleState>>,
};

export const AdminVerificationConfirm = <TData, >({
  data,
  getConfirmPayload,
  onVerified,
  state,
  setState,
}: Props<TData>) => {
  const {error} = state;

  const {act} = useUserDataActor();

  const onClickVerify = (pass: boolean) => async () => {
    if (!act) {
      await signIn();
      return;
    }

    const session = await act({
      action: 'request',
      options: getConfirmPayload(data, pass),
    });
    const error = session?.user.jwtUpdateError;
    if (!error) {
      onVerified();
      return;
    }

    setState((original) => ({
      ...original,
      error,
    }));
  };

  return (
    <Popup show={state.show === 'confirm'} setShow={() => setState((original) => ({
      ...original,
      show: null,
      payload: null,
    }))}>
      <Flex center className="gap-2 sm:w-96">
        {error && <Alert>{translateApiError(error)}</Alert>}
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
          <CheckCircleIcon className="h-9 w-9"/>
          <div>通過</div>
        </FlexButton>
        <FlexButton
          center
          noFullWidth={false}
          className="button-base button-text-hover h-24 gap-1 bg-red-800 p-2 text-3xl hover:bg-red-300"
          onClick={onClickVerify(false)}
        >
          <XCircleIcon className="h-9 w-9"/>
          <div>駁回</div>
        </FlexButton>
      </Flex>
    </Popup>
  );
};

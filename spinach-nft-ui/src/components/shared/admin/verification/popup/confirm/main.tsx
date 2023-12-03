import React from 'react';

import {translateApiError} from '@spinach/common/utils/translate/apiError';
import {signIn} from 'next-auth/react';

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

  const onClickVerify = async () => {
    if (!act) {
      await signIn();
      return;
    }

    const session = await act({
      action: 'request',
      options: getConfirmPayload(data),
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
      <Flex center className="gap-2">
        {error && <Alert>{translateApiError(error)}</Alert>}
        <div className="text-xl">
          確認驗證
        </div>
        <hr className="w-full"/>
        <div>
          確定要通過驗證嗎？
        </div>
        <button className="button-clickable-bg w-1/2 p-2" onClick={onClickVerify}>
          確認
        </button>
      </Flex>
    </Popup>
  );
};

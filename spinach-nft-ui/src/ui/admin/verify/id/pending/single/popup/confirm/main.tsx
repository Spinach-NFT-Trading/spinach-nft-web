import React from 'react';

import {translateApiError} from '@spinach/common/utils/translate/apiError';
import {signIn} from 'next-auth/react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {
  AdminPendingVerificationProps,
  AdminPendingVerificationState,
} from '@spinach/next/ui/admin/verify/id/pending/single/type';
import {formatUserName} from '@spinach/next/utils/data/user';


type Props = AdminPendingVerificationProps & {
  state: AdminPendingVerificationState,
  setState: React.Dispatch<React.SetStateAction<AdminPendingVerificationState>>,
};

export const AdminPendingVerificationConfirm = ({state, setState, user, onVerified}: Props) => {
  const {error} = state;
  const {id} = user;

  const {act} = useUserDataActor();

  const onClickVerify = async () => {
    if (!act) {
      await signIn();
      return;
    }

    const session = await act({
      action: 'request',
      options: {
        type: 'adminVerifyAccount',
        data: {
          targetId: id,
        },
      },
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
    <Popup show={state.show === 'confirm'} setShow={(show) => setState((original) => ({
      ...original,
      show: show ? 'confirm' : null,
    }))}>
      <Flex center className="gap-2">
        {error && <Alert>{translateApiError(error)}</Alert>}
        <div className="text-xl">
          確認驗證
        </div>
        <hr className="w-full"/>
        <div>
          確定要讓 {formatUserName(user)} 通過驗證嗎？
        </div>
        <button className="button-clickable-bg w-1/2 p-2" onClick={onClickVerify}>
          確認
        </button>
      </Flex>
    </Popup>
  );
};

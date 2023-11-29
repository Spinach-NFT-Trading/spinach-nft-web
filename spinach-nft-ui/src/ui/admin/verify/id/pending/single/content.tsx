import React from 'react';

import {accountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {translateApiError} from '@spinach/common/utils/translate/apiError';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {CopyButton} from '@spinach/next/components/shared/copy';
import {accountIdVerificationTypeText} from '@spinach/next/const/account';
import {AdminPendingVerificationCell} from '@spinach/next/ui/admin/verify/id/pending/single/cell';
import {AdminPendingVerificationConfirm} from '@spinach/next/ui/admin/verify/id/pending/single/popup/confirm/main';
import {AdminPendingVerificationImage} from '@spinach/next/ui/admin/verify/id/pending/single/popup/image/main';
import {
  AdminPendingVerificationProps,
  AdminPendingVerificationState,
} from '@spinach/next/ui/admin/verify/id/pending/single/type';


export const AdminPendingVerificationContent = (props: AdminPendingVerificationProps) => {
  const {user} = props;
  const [state, setState] = React.useState<AdminPendingVerificationState>({
    show: null,
    type: null,
    userId: null,
    error: null,
  });

  if (!user) {
    return;
  }

  const {
    id,
    username,
    name,
    idNumber,
    birthday,
    email,
    lineId,
    wallet,
  } = user;

  return (
    <Flex>
      <Popup show={state.show === 'image'} setShow={(show) => setState((original) => ({
        ...original,
        show: show ? 'image' : null,
      }))}>
        <AdminPendingVerificationImage state={state}/>
      </Popup>
      <AdminPendingVerificationConfirm state={state} setState={setState} {...props}/>
      <Flex className="gap-1.5 p-2">
        {state.error && <Alert>{translateApiError(state.error)}</Alert>}
        <Flex className="gap-1.5 md:flex-row">
          <Flex className="gap-1">
            <AdminPendingVerificationCell title="使用者 ID" info={username}/>
            <AdminPendingVerificationCell title="姓名" info={name}/>
            <AdminPendingVerificationCell title="身分證" info={idNumber}/>
            <AdminPendingVerificationCell title="生日" info={birthday}/>
            <AdminPendingVerificationCell title="Email" info={email}/>
            <AdminPendingVerificationCell title="LINE ID" info={lineId}/>
          </Flex>
          <Flex className="justify-between">
            <Flex className="gap-1">
              {accountIdVerificationType.map((type) => (
                <button key={type} className="button-clickable-bg py-3" onClick={() => setState((original) => ({
                  ...original,
                  type,
                  userId: id,
                  show: 'image',
                }))}>
                  {accountIdVerificationTypeText[type]}
                </button>
              ))}
            </Flex>
            <button className="button-clickable-bg-warn py-5" onClick={() => setState((original) => ({
              ...original,
              show: 'confirm',
            }))}>
              確認驗證
            </button>
          </Flex>
        </Flex>
        <AdminPendingVerificationCell
          title="錢包地址"
          info={
            <Flex direction="row" noFullWidth center className="w-min gap-1 rounded-lg pl-2 ring-1 ring-slate-300">
              <code className="truncate">{wallet}</code>
              <CopyButton data={wallet}/>
            </Flex>
          }
        />
      </Flex>
    </Flex>
  );
};

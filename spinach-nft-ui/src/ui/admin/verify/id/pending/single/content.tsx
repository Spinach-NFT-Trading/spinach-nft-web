import React from 'react';

import {accountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {UserInfo} from '@spinach/common/types/common/user';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {CopyButton} from '@spinach/next/components/shared/copy';
import {accountIdVerificationTypeText} from '@spinach/next/const/account';
import {AdminPendingVerificationCell} from '@spinach/next/ui/admin/verify/id/pending/single/cell';
import {AdminPendingVerificationImage} from '@spinach/next/ui/admin/verify/id/pending/single/image/main';
import {AdminPendingVerificationPopupState} from '@spinach/next/ui/admin/verify/id/pending/single/type';


type Props = {
  user: UserInfo | null,
};

export const AdminPendingVerificationContent = ({user}: Props) => {
  const [state, setState] = React.useState<AdminPendingVerificationPopupState>({
    show: false,
    type: null,
    userId: null,
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
      <Popup show={state.show} setShow={(show) => setState((original) => ({
        ...original,
        show,
      }))}>
        <AdminPendingVerificationImage state={state}/>
      </Popup>
      <Flex className="gap-1.5 p-2">
        <Flex className="gap-1.5 md:flex-row">
          <Flex className="gap-1">
            <AdminPendingVerificationCell title="使用者 ID" info={username}/>
            <AdminPendingVerificationCell title="姓名" info={name}/>
            <AdminPendingVerificationCell title="身分證" info={idNumber}/>
            <AdminPendingVerificationCell title="生日" info={birthday}/>
            <AdminPendingVerificationCell title="Email" info={email}/>
            <AdminPendingVerificationCell title="LINE ID" info={lineId}/>
          </Flex>
          <Flex className="gap-1">
            {accountIdVerificationType.map((type) => (
              <button key={type} className="button-clickable-bg py-3" onClick={() => setState({
                type,
                userId: id,
                show: true,
              })}>
                {accountIdVerificationTypeText[type]}
              </button>
            ))}
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

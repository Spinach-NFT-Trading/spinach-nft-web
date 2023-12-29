import React from 'react';

import {accountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {UserInfo} from '@spinach/common/types/common/user';
import clsx from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Grid} from '@spinach/next/components/layout/grid';
import {AdminVerificationDataCell} from '@spinach/next/components/shared/admin/verification/cell';
import {AdminVerificationCollapsible} from '@spinach/next/components/shared/admin/verification/main';
import {CopyButton} from '@spinach/next/components/shared/copy';
import {accountIdVerificationTypeText} from '@spinach/next/const/account';
import {formatUserName} from '@spinach/next/utils/data/user';


type Props = {
  initialUsers: UserInfo[],
};

export const AdminVerifyIdPending = ({initialUsers}: Props) => {
  const [users, setUsers] = React.useState(initialUsers);

  return (
    <Grid className="grid-cols-1 gap-2 xl:grid-cols-2 3xl:grid-cols-3">
      {users.map((user) => (
        <AdminVerificationCollapsible
          key={user.id}
          data={user}
          onVerified={() => setUsers((original) => (
            original.filter(({id}) => id !== user.id)
          ))}
          getConfirmPayload={({id}) => ({
            type: 'admin.verify.account',
            data: {
              targetId: id,
            },
          })}
          getImageData={(data) => data?.adminImageOfId?.data}
          getImageRequestPayload={({id}) => accountIdVerificationType.map((type) => ({
            opts: {
              type: 'adminImageOfId',
              opts: {
                type,
                userId: id,
              },
            },
            imageName: accountIdVerificationTypeText[type],
          }))}
          getTitle={formatUserName}
          getInfo={({
            username,
            name,
            idNumber,
            birthday,
            email,
            lineId,
            wallet,
          }) => (
            <Flex className="gap-1.5">
              <Flex className="gap-1">
                <AdminVerificationDataCell title="使用者 ID" info={username}/>
                <AdminVerificationDataCell title="姓名" info={name}/>
                <AdminVerificationDataCell title="身分證" info={idNumber}/>
                <AdminVerificationDataCell title="生日" info={birthday}/>
                <AdminVerificationDataCell title="Email" info={email}/>
                <AdminVerificationDataCell title="LINE ID" info={lineId}/>
              </Flex>
              <AdminVerificationDataCell
                title="錢包地址"
                info={
                  <Flex direction="row" noFullWidth center className={clsx(
                    'w-min gap-1 rounded-lg pl-2 ring-1 ring-slate-300',
                  )}>
                    <code className="truncate">{wallet}</code>
                    <CopyButton data={wallet}/>
                  </Flex>
                }
              />
            </Flex>
          )}
        />
      ))}
    </Grid>
  );
};

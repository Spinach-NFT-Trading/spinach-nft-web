import React from 'react';

import {accountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {UserInfo} from '@spinach/common/types/common/user';
import clsx from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminVerificationDataCell} from '@spinach/next/components/shared/admin/verification/cell';
import {AdminVerification} from '@spinach/next/components/shared/admin/verification/main';
import {CopyButton} from '@spinach/next/components/shared/copy';
import {accountIdVerificationTypeText} from '@spinach/next/const/account';
import {adminDataRowHeight} from '@spinach/next/ui/admin/const';
import {useAdminVerifyFilteredData} from '@spinach/next/ui/admin/verify/common/hook/filteredData';
import {AdminVerifyIdTxnRow} from '@spinach/next/ui/admin/verify/id/row';
import {AdminVerifyIdFilterData, AdminVerifyIdFilterInput} from '@spinach/next/ui/admin/verify/id/type';


type Props = {
  data: UserInfo[],
  input: AdminVerifyIdFilterInput,
};

export const AdminVerifyIdResults = ({data, input}: Props) => {
  const [users, setUsers] = React.useState(data);
  const userToShow = useAdminVerifyFilteredData({
    input,
    data: users,
    toFilterData: ({idNumber, username, name}): AdminVerifyIdFilterData => ({
      idNumber,
      username,
      name,
    }),
  });

  return (
    <AdminVerification
      header={<AdminVerifyIdTxnRow isTitle/>}
      data={userToShow}
      itemHeight={adminDataRowHeight}
      getKey={(entry) => entry?.id}
      getInfo={(user) => <AdminVerifyIdTxnRow data={user}/>}
      getImageData={(data) => data?.adminImageOfId ?? null}
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
      getConfirmPayload={(pass, data) => ({
        type: 'admin.verify.account',
        data: {
          targetId: data.data.id,
          pass,
        },
      })}
      getPopupData={(data) => ({
        userId: data.id,
        data,
      })}
      onVerified={(verified) => setUsers((original) => (
        original.filter(({id}) => id !== verified.data.id)
      ))}
      renderOtherInfo={({data}) => {
        const {
          birthday,
          email,
          lineId,
          wallet,
        } = data;

        return (
          <Flex className="gap-1.5 p-1">
            <Flex className="gap-1">
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
        );
      }}
    />
  );
};

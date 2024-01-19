import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminVerificationDataCell} from '@spinach/next/components/shared/admin/verification/cell';
import {AdminVerification} from '@spinach/next/components/shared/admin/verification/main';
import {ResponseOfUnverifiedBankDetails} from '@spinach/next/types/userData/lazyLoaded';
import {adminDataRowHeight} from '@spinach/next/ui/admin/const';
import {AdminVerifyBankRow} from '@spinach/next/ui/admin/verify/bank/row';
import {AdminVerifyBankFilterData, AdminVerifyBankFilterInput} from '@spinach/next/ui/admin/verify/bank/type';
import {useAdminVerifyFilteredData} from '@spinach/next/ui/admin/verify/common/hook/filteredData';


type Props = {
  data: ResponseOfUnverifiedBankDetails,
  input: AdminVerifyBankFilterInput,
};

export const AdminVerifyBankResults = ({data, input}: Props) => {
  const {userDataMap, details} = data;
  const [bankDetails, setBankDetails] = React.useState(details);

  const bankDetailsToShow = useAdminVerifyFilteredData({
    input,
    data: bankDetails,
    toFilterData: (details): AdminVerifyBankFilterData | null => {
      const user = userDataMap[details.userId];

      if (!user) {
        return null;
      }

      return {
        username: user.username,
        name: user.name,
        bankAccount: details.account,
      };
    },
  });

  return (
    <AdminVerification
      header={<AdminVerifyBankRow isTitle/>}
      data={bankDetailsToShow}
      itemHeight={adminDataRowHeight}
      getKey={(entry) => entry?.uuid}
      getInfo={(data) => {
        const user = userDataMap[data.userId];

        if (!user) {
          return null;
        }

        return <AdminVerifyBankRow data={{user, bankDetails: data}}/>;
      }}
      getImageData={(data) => data?.adminImageOfBankDetails ?? null}
      getImageRequestPayload={({uuid}) => [
        {
          opts: {
            type: 'adminImageOfBankDetails',
            opts: {uuid},
          },
          imageName: '銀行存摺封面圖',
        },
      ]}
      getConfirmPayload={(pass, data) => ({
        type: 'admin.verify.bank',
        data: {
          targetUuid: data.data.uuid,
          pass,
        },
      })}
      getPopupData={(data) => ({userId: data.userId, data})}
      onVerified={(verified) => setBankDetails((original) => (
        original.filter(({uuid}) => uuid !== verified.data.uuid)
      ))}
      renderOtherInfo={({data}) => (
        <Flex className="gap-1">
          <AdminVerificationDataCell title="持有人姓名" info={userDataMap[data.userId]?.name}/>
          <AdminVerificationDataCell title="銀行代碼" info={data.code}/>
          <AdminVerificationDataCell title="銀行帳號" info={data.account}/>
        </Flex>
      )}
    />
  );
};

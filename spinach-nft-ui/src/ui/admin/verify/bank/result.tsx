import React from 'react';

import {useTranslations} from 'next-intl';

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

  const t = useTranslations('UI.InPage.Admin.VerifyInfo.Bank');

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
            type: 'adminImageOfBankDetails' as const,
            opts: {uuid},
          },
          imageName: t('BankbookCover'),
        },
      ]}
      getConfirmPayload={(pass, data) => ({
        type: 'admin.verify.bank',
        data: {
          targetUuid: data.uuid,
          pass,
        },
      })}
      onVerified={(verified) => setBankDetails((original) => (
        original.filter(({uuid}) => uuid !== verified.uuid)
      ))}
      renderOtherInfo={() => null}
      hideOtherInfo
    />
  );
};

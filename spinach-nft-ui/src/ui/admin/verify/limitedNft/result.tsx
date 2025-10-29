import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminVerificationDataCell} from '@spinach/next/components/shared/admin/verification/cell';
import {AdminVerification} from '@spinach/next/components/shared/admin/verification/main';
import {adminDataRowHeight} from '@spinach/next/ui/admin/const';
import {useAdminVerifyFilteredData} from '@spinach/next/ui/admin/verify/common/hook/filteredData';
import {AdminVerifyLimitedNftRow} from '@spinach/next/ui/admin/verify/limitedNft/row';
import {
  AdminVerifyLimitedNftData,
  AdminVerifyLimitedNftFilterData,
  AdminVerifyLimitedNftFilterInput,
} from '@spinach/next/ui/admin/verify/limitedNft/type';
import {formatInt} from '@spinach/next/utils/number/format';


type Props = {
  data: AdminVerifyLimitedNftData,
  input: AdminVerifyLimitedNftFilterInput,
};

export const AdminVerifyLimitedNftResults = ({data, input}: Props) => {
  const {
    userDataMap,
    nftInfoMap,
    nftTxnMap,
    pending: initialPending,
  } = data;
  const [pending, setPending] = React.useState(initialPending);

  const t = useTranslations('UI.Account');
  const t2 = useTranslations('UI.InPage.Admin.VerifyInfo.LimitedNft');

  const pendingToShow = useAdminVerifyFilteredData({
    input,
    data: pending,
    toFilterData: (record): AdminVerifyLimitedNftFilterData | null => {
      const user = userDataMap[record.buyer];
      if (!user) {
        return null;
      }

      return {
        username: user.username,
        name: user.name,
      };
    },
  });

  return (
    <AdminVerification
      header={<AdminVerifyLimitedNftRow isTitle/>}
      data={pendingToShow}
      itemHeight={adminDataRowHeight}
      getKey={(entry) => entry?.uuid}
      getInfo={(pending) => {
        const user = userDataMap[pending.buyer];
        const nftInfo = nftInfoMap[pending.nftId];
        const txn = nftTxnMap[pending.nftTxnId];

        if (!user || !txn) {
          return null;
        }

        return <AdminVerifyLimitedNftRow data={{user, nftInfo, pending, txn}}/>;
      }}
      getImageData={(data) => data?.adminImageOfLimitedNft ?? null}
      getImageRequestPayload={({uuid}) => [
        {
          opts: {
            type: 'adminImageOfLimitedNft' as const,
            opts: {uuid},
          },
          imageName: t2('TransferProof'),
        },
      ]}
      getConfirmPayload={(pass, data) => ({
        type: 'admin.verify.limitedNft',
        data: {
          targetUuid: data.uuid,
          pass,
        },
      })}
      onVerified={(verified) => setPending((original) => original.filter(({uuid}) => uuid !== verified.uuid))}
      renderOtherInfo={(data) => {
        const {buyer, nftId, nftTxnId} = data;

        const userData = userDataMap[buyer];
        const txn = nftTxnMap[nftTxnId];
        const nftInfo = nftInfoMap[nftId];

        return (
          <Flex className="gap-1">
            <AdminVerificationDataCell title={t('Info.UserId')} info={userData?.username}/>
            <AdminVerificationDataCell title={t('Info.Name')} info={userData?.name}/>
            <AdminVerificationDataCell title={t2('BankAccount')} info={nftInfo?.bankAccount}/>
            <AdminVerificationDataCell title={t2('Amount')} info={formatInt(txn?.price)}/>
          </Flex>
        );
      }}
    />
  );
};

import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminVerificationDataCell} from '@spinach/next/components/shared/admin/verification/cell';
import {AdminVerification} from '@spinach/next/components/shared/admin/verification/main';
import {ResponseOfUnverifiedGoldTxn} from '@spinach/next/types/userData/lazyLoaded';
import {adminDataRowHeight} from '@spinach/next/ui/admin/const';
import {useAdminVerifyFilteredData} from '@spinach/next/ui/admin/verify/common/hook/filteredData';
import {AdminVerifyGoldTxnRow} from '@spinach/next/ui/admin/verify/goldTxn/row';
import {
  AdminVerifyGoldTxnFilterData,
  AdminVerifyGoldTxnFilterInput,
} from '@spinach/next/ui/admin/verify/goldTxn/type';
import {formatWallet} from '@spinach/next/utils/data/wallet';
import {formatInt} from '@spinach/next/utils/number/format';


type Props = {
  data: ResponseOfUnverifiedGoldTxn,
  input: AdminVerifyGoldTxnFilterInput,
};

export const AdminVerifyGoldTxnResults = ({data, input}: Props) => {
  const {
    userDataMap,
    bankDetailsMap,
    walletMap,
    unverified,
  } = data;
  const [twBankTxn, setTwBankTxn] = React.useState(unverified.twBank);

  const t = useTranslations('UI.Account');
  const t2 = useTranslations('UI.InPage.Admin.VerifyInfo.GoldTxn');

  const twBankTxnToShow = useAdminVerifyFilteredData({
    input,
    data: twBankTxn,
    toFilterData: (record): AdminVerifyGoldTxnFilterData | null => {
      const user = userDataMap[record.accountId];
      const bankDetails = bankDetailsMap[record.sourceBankDetailsUuid];

      if (!user || !bankDetails) {
        return null;
      }

      return {
        username: user.username,
        name: user.name,
        bankAccount: bankDetails.account,
      };
    },
  });

  return (
    <AdminVerification
      header={<AdminVerifyGoldTxnRow isTitle/>}
      data={twBankTxnToShow}
      itemHeight={adminDataRowHeight}
      getKey={(entry) => entry?.uuid}
      getInfo={(txn) => {
        const user = userDataMap[txn.accountId];

        if (!user) {
          return null;
        }

        return <AdminVerifyGoldTxnRow data={{user, txn}}/>;
      }}
      getImageData={(data) => data?.adminImageOfGoldTxnTwBank ?? null}
      getImageRequestPayload={({uuid}) => [
        {
          opts: {
            type: 'adminImageOfGoldTxnTwBank',
            opts: {uuid},
          },
          imageName: t2('TxnRecord'),
        },
      ]}
      getConfirmPayload={(pass, data) => ({
        type: 'admin.verify.gold.twBank',
        data: {
          targetUuid: data.data.uuid,
          pass,
        },
      })}
      getPopupData={(data) => ({
        userId: data.accountId,
        data,
      })}
      onVerified={(verified) => setTwBankTxn((original) => (
        original.filter(({uuid}) => uuid !== verified.data.uuid)
      ))}
      renderOtherInfo={({data}) => {
        const {
          accountId,
          sourceBankDetailsUuid,
          targetWalletId,
          amount,
        } = data;

        const userData = userDataMap[accountId];
        const bankDetails = bankDetailsMap[sourceBankDetailsUuid];
        const targetWallet = walletMap[targetWalletId];

        return (
          <Flex className="gap-1">
            <AdminVerificationDataCell title={t('Info.UserId')} info={userData?.username}/>
            <AdminVerificationDataCell title={t('Info.Name')} info={userData?.name}/>
            <AdminVerificationDataCell title={t2('SourceBankCode')} info={bankDetails?.code}/>
            <AdminVerificationDataCell title={t2('SourceBankAccount')} info={bankDetails?.account}/>
            <AdminVerificationDataCell
              title={t2('TargetWallet')}
              info={targetWallet ? formatWallet(targetWallet) : '-'}
            />
            <AdminVerificationDataCell title={t2('Amount')} info={formatInt(amount)}/>
          </Flex>
        );
      }}
    />
  );
};

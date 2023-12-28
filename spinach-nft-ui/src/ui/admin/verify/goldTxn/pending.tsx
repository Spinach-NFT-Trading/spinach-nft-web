import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Grid} from '@spinach/next/components/layout/grid';
import {AdminVerificationDataCell} from '@spinach/next/components/shared/admin/verification/cell';
import {AdminVerificationCollapsible} from '@spinach/next/components/shared/admin/verification/main';
import {ResponseOfUnverifiedGoldTxn} from '@spinach/next/types/userData/lazyLoaded';
import {formatWallet} from '@spinach/next/utils/data/wallet';
import {formatInt} from '@spinach/next/utils/number';


type Props = {
  data: ResponseOfUnverifiedGoldTxn,
};

export const AdminVerifyGoldTxnPending = ({data}: Props) => {
  const {
    userDataMap,
    bankDetailsMap,
    walletMap,
    unverified,
  } = data;
  const [twBankTxn, setTwBankTxn] = React.useState(unverified.twBank);

  return (
    <Grid className="grid-cols-1 gap-2 xl:grid-cols-2 3xl:grid-cols-3">
      {twBankTxn.map((txn) => (
        <AdminVerificationCollapsible
          key={txn.uuid}
          data={txn}
          onVerified={() => setTwBankTxn((original) => (
            original.filter(({uuid}) => uuid !== txn.uuid)
          ))}
          getConfirmPayload={({uuid}, pass) => ({
            type: 'adminVerifyGoldTxnTwBank',
            data: {
              targetUuid: uuid,
              pass,
            },
          })}
          getImageData={(data) => data?.adminImageOfGoldTxnTwBank?.data}
          getImageRequestPayload={({uuid}) => [{
            opts: {
              type: 'adminImageOfGoldTxnTwBank',
              opts: {uuid},
            },
            imageName: '台幣轉帳紀錄',
          }]}
          getTitle={({amount, accountId}) => `${userDataMap[accountId]?.name} - $${amount}`}
          getInfo={({
            accountId,
            sourceBankDetailsUuid,
            targetWalletId,
            amount,
          }) => {
            const userData = userDataMap[accountId];
            const bankDetails = bankDetailsMap[sourceBankDetailsUuid];
            const targetWallet = walletMap[targetWalletId];

            return (
              <Flex className="gap-1">
                <AdminVerificationDataCell title="使用者 ID" info={userData?.username}/>
                <AdminVerificationDataCell title="姓名" info={userData?.name}/>
                <AdminVerificationDataCell title="來源銀行代碼" info={bankDetails?.code}/>
                <AdminVerificationDataCell title="來源銀行帳號" info={bankDetails?.account}/>
                <AdminVerificationDataCell title="目標錢包" info={targetWallet ? formatWallet(targetWallet) : '-'}/>
                <AdminVerificationDataCell title="金額" info={formatInt(amount)}/>
              </Flex>
            );
          }}
        />
      ))}
    </Grid>
  );
};

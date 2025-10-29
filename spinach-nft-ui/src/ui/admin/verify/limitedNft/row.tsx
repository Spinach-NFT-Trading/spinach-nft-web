import React from 'react';

import {UserData} from '@spinach/common/types/common/user/data';
import {NftInfoModel} from '@spinach/common/types/data/nft';
import {NftLimitedPendingModelClient} from '@spinach/common/types/data/nft/limited';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {NftTxnModelClient} from '@spinach/next/types/mongo/nft';
import {AdminVerifyDataRowCommonProps} from '@spinach/next/ui/admin/verify/common/type';
import {formatUserName} from '@spinach/next/utils/data/user';
import {formatInt} from '@spinach/next/utils/number/format';


type Props = AdminVerifyDataRowCommonProps<{
  user: UserData,
  nftInfo?: NftInfoModel,
  pending: NftLimitedPendingModelClient,
  txn: NftTxnModelClient,
}>;

export const AdminVerifyLimitedNftRow = ({isTitle, data}: Props) => {
  const t = useTranslations('UI.InPage.Admin.VerifyInfo.LimitedNft');

  return (
    <>
      <Flex center noFullWidth className="w-52">
        {isTitle ? t('Buyer') : formatUserName(data.user)}
      </Flex>
      <Flex noFullWidth className={clsx('w-20', isTitle ? 'items-center' : 'items-end p-2')}>
        {isTitle ? t('Amount') : formatInt(data.txn.price)}
      </Flex>
      <Flex center noFullWidth className="w-40">
        {isTitle ? t('BankAccount') : (data.nftInfo?.bankAccount ?? '-')}
      </Flex>
    </>
  );
};

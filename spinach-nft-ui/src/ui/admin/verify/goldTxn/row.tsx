import React from 'react';

import {UserData} from '@spinach/common/types/common/user/data';
import {GoldPurchaseTwBankRecordClient} from '@spinach/common/types/data/gold/purchase';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminVerifyDataRowCommonProps} from '@spinach/next/ui/admin/verify/common/type';
import {formatUserName} from '@spinach/next/utils/data/user';
import {formatInt} from '@spinach/next/utils/number/format/regular';


type Props = AdminVerifyDataRowCommonProps<{
  user: UserData,
  txn: GoldPurchaseTwBankRecordClient,
}>;

export const AdminVerifyGoldTxnRow = ({isTitle, data}: Props) => {
  const t = useTranslations('UI.Account');
  const t2 = useTranslations('UI.InPage.Admin.VerifyInfo.GoldTxn');

  return (
    <>
      <Flex center noFullWidth className="w-52">
        {isTitle ? t('Info.User') : formatUserName(data.user)}
      </Flex>
      <Flex noFullWidth className={clsx('w-20', isTitle ? 'items-center' : 'items-end p-2')}>
        {isTitle ? t2('Amount') : formatInt(data.txn.amount)}
      </Flex>
    </>
  );
};

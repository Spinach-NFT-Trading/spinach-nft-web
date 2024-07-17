import React from 'react';

import {UserData} from '@spinach/common/types/common/user/data';
import {BankDetails} from '@spinach/common/types/data/user/bank';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminVerifyDataRowCommonProps} from '@spinach/next/ui/admin/verify/common/type';
import {formatUserName} from '@spinach/next/utils/data/user';


type Props = AdminVerifyDataRowCommonProps<{
  user: UserData,
  bankDetails: BankDetails,
}>;

export const AdminVerifyBankRow = ({isTitle, data}: Props) => {
  const t = useTranslations('UI.Account');

  return (
    <>
      <Flex center noFullWidth className="w-52">
        {isTitle ? t('Info.User') : formatUserName(data.user)}
      </Flex>
      <Flex center noFullWidth className="w-16">
        {isTitle ? t('BankAccounts.Code') : data.bankDetails.code}
      </Flex>
      <Flex center noFullWidth className="w-52">
        {isTitle ? t('BankAccounts.Account') : data.bankDetails.account}
      </Flex>
    </>
  );
};

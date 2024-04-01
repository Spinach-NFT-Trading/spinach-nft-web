import React from 'react';

import {UserData} from '@spinach/common/types/common/user/data';
import {BankDetails} from '@spinach/common/types/data/user/bank';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminVerifyDataRowCommonProps} from '@spinach/next/ui/admin/verify/common/type';
import {formatUserName} from '@spinach/next/utils/data/user';


type Props = AdminVerifyDataRowCommonProps<{
  user: UserData,
  bankDetails: BankDetails,
}>;

export const AdminVerifyBankRow = ({isTitle, data}: Props) => {
  return (
    <>
      <Flex center noFullWidth className="w-52">
        {isTitle ? '使用者' : formatUserName(data.user)}
      </Flex>
      <Flex center noFullWidth className="w-16">
        {isTitle ? '銀行代碼' : data.bankDetails.code}
      </Flex>
      <Flex center noFullWidth className="w-52">
        {isTitle ? '銀行帳號' : data.bankDetails.account}
      </Flex>
    </>
  );
};

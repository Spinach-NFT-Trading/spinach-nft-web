import React from 'react';

import {UserData} from '@spinach/common/types/common/user';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminVerifyDataRowCommonProps} from '@spinach/next/ui/admin/verify/common/type';


type Props = AdminVerifyDataRowCommonProps<UserData>;

export const AdminVerifyIdTxnRow = ({isTitle, data}: Props) => {
  return (
    <>
      <Flex center noFullWidth className="w-40">
        {isTitle ? '姓名' : data.name}
      </Flex>
      <Flex center noFullWidth className="w-40">
        {isTitle ? '帳號 ID' : data.username}
      </Flex>
      <Flex center noFullWidth className="w-40">
        {isTitle ? '身分證字號' : data.idNumber}
      </Flex>
    </>
  );
};

import React from 'react';

import {UserData} from '@spinach/common/types/common/user/data';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminVerifyDataRowCommonProps} from '@spinach/next/ui/admin/verify/common/type';


type Props = AdminVerifyDataRowCommonProps<UserData>;

export const AdminVerifyIdTxnRow = ({isTitle, data}: Props) => {
  const t = useTranslations('UI.Account.Info');

  return (
    <>
      <Flex center noFullWidth className="w-40">
        {isTitle ? t('Name') : data.name}
      </Flex>
      <Flex center noFullWidth className="w-40">
        {isTitle ? t('UserId') : data.username}
      </Flex>
      <Flex center noFullWidth className="w-40">
        {isTitle ? t('IdentificationNumber') : data.idNumber}
      </Flex>
    </>
  );
};

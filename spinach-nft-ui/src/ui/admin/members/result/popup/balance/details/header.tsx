import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';


export const AdminMemberBalanceDetailsHeader = () => {
  const t = useTranslations('UI.InPage.Admin.Members.Popup.Balance.Details.Header');

  return (
    <Flex noFullWidth direction="row" className="bg-slate-800 p-2">
      <Flex center noFullWidth className="w-40">
        {t('Time')}
      </Flex>
      <Flex center noFullWidth className="w-40">
        {t('Type')}
      </Flex>
      <Flex center noFullWidth className="w-28">
        {t('Amount')}
      </Flex>
      <Flex center noFullWidth className="w-28">
        {t('Balance')}
      </Flex>
    </Flex>
  );
};

import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';


export const AdminMemberNftTxnHeader = () => {
  const t = useTranslations('UI.InPage.Admin.Members.Popup.NftTxn.Header');

  return (
    <Flex noFullWidth direction="row" className="bg-slate-800 p-2">
      <Flex center noFullWidth className="w-40">
        {t('Time')}
      </Flex>
      <Flex noFullWidth className="w-20"/>
      <Flex center noFullWidth className="w-52">
        {t('NftId')}
      </Flex>
      <Flex center noFullWidth className="w-52">
        {t('Counterparty')}
      </Flex>
    </Flex>
  );
};

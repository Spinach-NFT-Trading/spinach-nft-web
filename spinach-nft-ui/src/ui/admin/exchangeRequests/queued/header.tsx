import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';


export const AdminExchangeRequestsQueuedHeader = () => {
  const t = useTranslations('UI.InPage.Admin.ExchangeRequest.Header');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1 bg-slate-900/90 px-1 py-2">
      <Flex center noFullWidth className="w-20">
        {t('Amount')}
      </Flex>
      <Flex center noFullWidth className="w-40">
        {t('TimePassed')}
      </Flex>
      <Flex center noFullWidth className="w-96">
        {t('SourceToken')}
      </Flex>
    </Flex>
  );
};

import React from 'react';

import {useTranslations} from 'next-intl';

import {useTabbedContentControl} from '@spinach/next/components/layout/tab/hook';
import {TabbedContent} from '@spinach/next/components/layout/tab/main';
import {
  getNftExchangeRequestsCompleted,
  getNftExchangeRequestsMatched,
} from '@spinach/next/controller/nft/request/match';
import {AdminExchangeRequestsMatched} from '@spinach/next/ui/admin/exchangeRequests/matched/main';
import {AdminExchangeRequestsQueued} from '@spinach/next/ui/admin/exchangeRequests/queued/main';
import {adminExchangeRequestsTabs, AdminExchangeRequestsTabs} from '@spinach/next/ui/admin/exchangeRequests/type';


export const AdminExchangeRequests = () => {
  const t = useTranslations('UI.InPage.Admin.ExchangeRequest.Tabs');

  const tabControl = useTabbedContentControl<AdminExchangeRequestsTabs>('queued');

  return (
    <TabbedContent
      keys={[...adminExchangeRequestsTabs]}
      control={tabControl}
      tabTitle={{
        queued: t('Queued'),
        matched: t('Matched'),
        completed: t('Completed'),
      }}
      content={{
        queued: <AdminExchangeRequestsQueued/>,
        matched: <AdminExchangeRequestsMatched dataPromise={getNftExchangeRequestsMatched}/>,
        completed: <AdminExchangeRequestsMatched dataPromise={getNftExchangeRequestsCompleted}/>,
      }}
      getReactKey={(key) => key}
      classOfContents="p-2"
    />
  );
};

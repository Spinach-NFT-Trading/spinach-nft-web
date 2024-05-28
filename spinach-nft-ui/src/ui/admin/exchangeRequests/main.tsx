import React from 'react';

import {useTabbedContentControl} from '@spinach/next/components/layout/tab/hook';
import {TabbedContent} from '@spinach/next/components/layout/tab/main';
import {AdminExchangeRequestsQueued} from '@spinach/next/ui/admin/exchangeRequests/queued/main';
import {adminExchangeRequestsTabs, AdminExchangeRequestsTabs} from '@spinach/next/ui/admin/exchangeRequests/type';


export const AdminExchangeRequests = () => {
  const tabControl = useTabbedContentControl<AdminExchangeRequestsTabs>('queued');

  return (
    <TabbedContent
      keys={[...adminExchangeRequestsTabs]}
      control={tabControl}
      tabTitle={{
        queued: '待成交',
        pending: '待確認',
        completed: '已完成',
      }}
      content={{
        queued: <AdminExchangeRequestsQueued/>,
        pending: <></>,
        completed: <></>,
      }}
      getReactKey={(key) => key}
      classOfContents="p-2"
    />
  );
};

import React from 'react';

import {format} from 'date-fns/format';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {OverflowableTable} from '@spinach/next/components/shared/common/table/overflowable/main';
import {getNftExchangeRequestsQueued} from '@spinach/next/controller/nft/request/queue';
import {AdminExchangeRequestsQueuedHeader} from '@spinach/next/ui/admin/exchangeRequests/queued/header';
import {AdminExchangeRequestsQueuedRow} from '@spinach/next/ui/admin/exchangeRequests/queued/row';
import {AdminExchangeRequestsQueuedState} from '@spinach/next/ui/admin/exchangeRequests/queued/type';


export const AdminExchangeRequestsQueued = () => {
  const t = useTranslations('UI.InPage.Admin.ExchangeRequest');

  const [state, setState] = React.useState<AdminExchangeRequestsQueuedState>({
    lastUpdated: new Date(),
    data: [],
  });

  const fetchData = () => getNftExchangeRequestsQueued().then((data) => setState({
    lastUpdated: new Date(),
    data,
  }));

  React.useEffect(() => {
    void fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Flex className="gap-1">
      <Flex direction="row" className="justify-end gap-1">
        <span>{t('LastUpdated')}</span>
        <span>{format(state.lastUpdated, 'yyyy-MM-dd HH:mm:ss')}</span>
      </Flex>
      <OverflowableTable
        data={state.data}
        header={<AdminExchangeRequestsQueuedHeader/>}
        getKey={(data) => data?.requestUuid}
        classOfRow="w-max gap-1 border-b-slate-400 px-1 py-2 not-last:border-b"
        renderRow={({data}) => <AdminExchangeRequestsQueuedRow data={data}/>}
      />
    </Flex>
  );
};

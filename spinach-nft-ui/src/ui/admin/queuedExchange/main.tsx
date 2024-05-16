import React from 'react';

import {format} from 'date-fns/format';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {OverflowableTable} from '@spinach/next/components/shared/common/table/overflowable/main';
import {getQueuedNftExchangeRequests} from '@spinach/next/controller/nft/request/queue';
import {AdminQueuedExchangeHeader} from '@spinach/next/ui/admin/queuedExchange/header';
import {AdminQueuedExchangeRow} from '@spinach/next/ui/admin/queuedExchange/row';
import {AdminQueuedExchangeState} from '@spinach/next/ui/admin/queuedExchange/type';


export const AdminQueuedExchange = () => {
  const [state, setState] = React.useState<AdminQueuedExchangeState>({
    lastUpdated: new Date(),
    data: [],
  });

  React.useEffect(() => {
    const intervalId = setInterval(
      () => getQueuedNftExchangeRequests().then((data) => setState({
        lastUpdated: new Date(),
        data,
      })),
      5000,
    );


    return () => clearInterval(intervalId);
  }, []);

  return (
    <Flex className="gap-1">
      <Flex direction="row" className="justify-end gap-1">
        <span>最後更新於</span>
        <span>{format(state.lastUpdated, 'yyyy-MM-dd HH:mm:ss')}</span>
      </Flex>
      <OverflowableTable
        data={state.data}
        header={<AdminQueuedExchangeHeader/>}
        getKey={(data) => data?.requestUuid}
        classOfRow="not-last:border-b w-max gap-1 border-b-slate-400"
        renderRow={({data}) => <AdminQueuedExchangeRow data={data}/>}
      />
    </Flex>
  );
};

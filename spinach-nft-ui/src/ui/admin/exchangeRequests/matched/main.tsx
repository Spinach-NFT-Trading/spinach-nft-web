import React from 'react';

import {NftExchangeMatchedBundle} from '@spinach/common/types/data/nft/match';
import {format} from 'date-fns/format';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {OverflowableTable} from '@spinach/next/components/shared/common/table/overflowable/main';
import {AdminExchangeRequestsMatchedHeader} from '@spinach/next/ui/admin/exchangeRequests/matched/header';
import {AdminExchangeRequestsMatchedRow} from '@spinach/next/ui/admin/exchangeRequests/matched/row';
import {AdminExchangeRequestsMatchedState} from '@spinach/next/ui/admin/exchangeRequests/matched/type';


type Props = {
  dataPromise: () => Promise<NftExchangeMatchedBundle>,
};

export const AdminExchangeRequestsMatched = ({dataPromise}: Props) => {
  const [state, setState] = React.useState<AdminExchangeRequestsMatchedState>({
    lastUpdated: new Date(),
    data: [],
    bankDetailsMap: {},
  });

  const fetchData = () => dataPromise().then(({data, bankDetailsMap}) => setState({
    lastUpdated: new Date(),
    data,
    bankDetailsMap,
  }));

  React.useEffect(() => {
    void fetchData();

    const intervalId = setInterval(fetchData, 5000);

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
        header={<AdminExchangeRequestsMatchedHeader/>}
        getKey={(data) => data?.requestUuid}
        classOfRow="w-max gap-1 border-b-slate-400 px-1 py-2 not-last:border-b"
        renderRow={({data}) => (
          <AdminExchangeRequestsMatchedRow data={data} bankDetailsMap={state.bankDetailsMap}/>
        )}
      />
    </Flex>
  );
};

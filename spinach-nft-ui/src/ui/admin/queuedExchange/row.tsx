import React from 'react';

import {NftExchangeQueuedModel} from '@spinach/common/types/data/nft/queue';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {formatInt} from '@spinach/next/utils/number';


type Props = {
  data: NftExchangeQueuedModel,
};

export const AdminQueuedExchangeRow = ({data}: Props) => {
  const {token, amount} = data;

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1 px-1 py-2">
      <Flex center noFullWidth className="w-96">
        <code>{token}</code>
      </Flex>
      <Flex center noFullWidth className="w-20">
        {formatInt(amount)}
      </Flex>
    </Flex>
  );
};

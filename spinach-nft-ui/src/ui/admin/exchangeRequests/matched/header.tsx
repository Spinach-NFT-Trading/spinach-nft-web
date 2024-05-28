import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';


export const AdminExchangeRequestsMatchedHeader = () => {
  return (
    <Flex direction="row" noFullWidth className="items-center gap-1 bg-slate-900/90 px-1 py-2">
      <Flex center noFullWidth className="w-96">
        要求 ID
      </Flex>
      <Flex center noFullWidth className="w-40">
        請求成立經過時長
      </Flex>
      <Flex center noFullWidth className="w-20">
        金額 (要求)
      </Flex>
      <Flex center noFullWidth className="w-20">
        金額 (實際)
      </Flex>
      <Flex center noFullWidth className="w-20">
        金額 (退還)
      </Flex>
      <Flex center noFullWidth className="w-96">
        來源 (Token)
      </Flex>
      <Flex center noFullWidth className="w-96">
        銀行帳號
      </Flex>
    </Flex>
  );
};

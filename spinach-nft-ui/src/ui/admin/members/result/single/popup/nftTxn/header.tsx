import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';


export const AdminMemberNftTxnHeader = () => {
  return (
    <Flex noFullWidth direction="row" className="bg-slate-800 p-2">
      <Flex center noFullWidth className="w-40">
        時間
      </Flex>
      <Flex noFullWidth className="w-20"/>
      <Flex center noFullWidth className="w-52">
        NFT ID
      </Flex>
      <Flex center noFullWidth className="w-52">
        交易對象
      </Flex>
    </Flex>
  );
};

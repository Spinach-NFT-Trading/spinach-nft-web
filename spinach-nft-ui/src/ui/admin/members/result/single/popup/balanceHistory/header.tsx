import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';


export const AdminMemberBalanceHistoryHeader = () => {
  return (
    <Flex noFullWidth direction="row" className="bg-slate-800 p-2">
      <Flex center noFullWidth className="w-40">
        時間
      </Flex>
      <Flex center noFullWidth className="w-40">
        種類
      </Flex>
      <Flex center noFullWidth className="w-28">
        變化
      </Flex>
      <Flex center noFullWidth className="w-28">
        餘額
      </Flex>
    </Flex>
  );
};

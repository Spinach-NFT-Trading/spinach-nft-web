import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {adminMemberMonetaryCellStyle} from '@spinach/next/ui/admin/common/cell/monetary/const';


export const AdminAgentHeader = () => {
  return (
    <Flex direction="row" noFullWidth className="items-center gap-1 bg-slate-900/90 px-1 py-2">
      <Flex center noFullWidth className="w-52">
        用戶名稱
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        下線總餘額
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        NFT 購買量
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        NFT 售出量
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        入金 (台幣)
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        入金 (USDT)
      </Flex>
      <Flex noFullWidth className="w-[20rem]"/>
    </Flex>
  );
};

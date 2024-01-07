import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {adminMemberMonetaryCellStyle} from '@spinach/next/ui/admin/members/result/single/cell/monetary/const';


export const AdminMemberSingleHeader = () => {
  return (
    <>
      <Flex center noFullWidth className="w-52">
        用戶名稱
      </Flex>
      <Flex center noFullWidth className="w-20">
        驗證狀態
      </Flex>
      <Flex center noFullWidth className="w-16">
        代理
      </Flex>
      <Flex center noFullWidth className={adminMemberMonetaryCellStyle}>
        目前餘額
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
      <Flex className="w-[42rem]"/>
    </>
  );
};
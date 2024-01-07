import React from 'react';

import clsx from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {adminMemberMonetaryCellStyle} from '@spinach/next/ui/admin/members/result/single/cell/monetary/const';


type Props = {
  style: React.CSSProperties,
};

export const AdminMemberSingleHeader = ({style}: Props) => {
  const {
    top,
    position,
    width,
    ...styleToUse
  } = style;

  return (
    <Flex direction="row" noFullWidth style={styleToUse} className={clsx(
      'sticky top-0 z-20 items-center bg-slate-900/90 p-2 [&>div]:shrink-0',
    )}>
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
    </Flex>
  );
};

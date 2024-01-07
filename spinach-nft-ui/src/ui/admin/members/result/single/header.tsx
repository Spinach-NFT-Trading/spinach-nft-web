import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';


type Props = {
  style: React.CSSProperties,
};

export const AdminMemberSingleHeader = ({style}: Props) => {
  const {top, position, ...styleToUse} = style;

  return (
    <Flex direction="row" noFullWidth className="sticky top-0 z-20 items-center bg-slate-900/90" style={styleToUse}>
      <Flex center noFullWidth className="w-40">
        用戶名稱
      </Flex>
      <Flex center noFullWidth className="w-20">
        驗證狀態
      </Flex>
      <Flex center noFullWidth className="w-12">
        代理
      </Flex>
    </Flex>
  );
};

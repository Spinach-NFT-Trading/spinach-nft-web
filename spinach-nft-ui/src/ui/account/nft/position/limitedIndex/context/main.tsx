'use client';
import React from 'react';

import {NftPositionLimitedContext} from '@spinach/next/ui/account/nft/position/limitedIndex/context/const';
import {NftPositionLimitedContextContent} from '@spinach/next/ui/account/nft/position/limitedIndex/context/type';


type Props = {
  data: NftPositionLimitedContextContent,
};

export const NftPositionLimitedProvider = ({data, children}: React.PropsWithChildren<Props>) => {
  return (
    <NftPositionLimitedContext.Provider value={data}>
      {children}
    </NftPositionLimitedContext.Provider>
  );
};

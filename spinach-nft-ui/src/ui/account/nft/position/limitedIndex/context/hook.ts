import React from 'react';

import {NftPositionLimitedContext} from '@spinach/next/ui/account/nft/position/limitedIndex/context/const';


export const useNftPositionLimitedData = () => {
  const context = React.useContext(NftPositionLimitedContext);

  if (context == null) {
    throw new Error('`useNftPositionLimitedData()` must be used within a <NftPositionLimitedProvider/>');
  }

  return context;
};


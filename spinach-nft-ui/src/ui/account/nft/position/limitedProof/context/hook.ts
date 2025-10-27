import React from 'react';

import {NftPositionLimitedProofContext} from '@spinach/next/ui/account/nft/position/limitedProof/context/const';


export const useNftPositionLimitedProofContext = () => {
  const context = React.useContext(NftPositionLimitedProofContext);

  if (context == null) {
    throw new Error('`useNftPositionLimitedProofContext()` must be used within a <NftPositionLimitedProofProvider/>');
  }

  return context;
};

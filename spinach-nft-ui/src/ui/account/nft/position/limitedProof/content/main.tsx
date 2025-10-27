import React from 'react';

import {NftPositionLimitedProofForm} from '@spinach/next/ui/account/nft/position/limitedProof/content/form';
import {NftPositionLimitedProofRedirect} from '@spinach/next/ui/account/nft/position/limitedProof/content/redirect';
import {useNftPositionLimitedProofContext} from '@spinach/next/ui/account/nft/position/limitedProof/context/hook';


export const NftPositionLimitedProofContent = () => {
  const {uploadCompleted} = useNftPositionLimitedProofContext();
  if (uploadCompleted) {
    return <NftPositionLimitedProofRedirect/>;
  }

  return <NftPositionLimitedProofForm/>;
};

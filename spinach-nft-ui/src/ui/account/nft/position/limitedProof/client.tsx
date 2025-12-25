'use client';
import React from 'react';

import {NftListingData} from '@spinach/next/types/nft';
import {NftPositionLimitedProofContent} from '@spinach/next/ui/account/nft/position/limitedProof/content/main';
import {NftPositionLimitedProofProvider} from '@spinach/next/ui/account/nft/position/limitedProof/context/main';


type Props = {
  fileUploadGrantId: string,
  nftListing: NftListingData,
};

export const NftPositionLimitedProofClient = ({fileUploadGrantId, nftListing}: Props) => {
  return (
    <NftPositionLimitedProofProvider fileUploadGrantId={fileUploadGrantId} nftListing={nftListing}>
      <NftPositionLimitedProofContent/>
    </NftPositionLimitedProofProvider>
  );
};

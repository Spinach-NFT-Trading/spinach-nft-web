import React from 'react';

import {NftListing} from '@spinach/next/components/shared/nft/main';
import {NftListingData} from '@spinach/next/types/nft';


type Props = {
  nftListing: NftListingData[],
  emptyText: string,
  getExtraInfo?: (nft: NftListingData) => React.ReactNode,
};

export const NftPositionLimitedListingLayout = ({nftListing, emptyText, getExtraInfo}: Props) => {
  if (nftListing.length === 0) {
    return <p>{emptyText}</p>;
  }

  return (
    <NftListing
      nftListings={nftListing}
      isOnSale={false}
      getExtraInfo={getExtraInfo}
    />
  );
};

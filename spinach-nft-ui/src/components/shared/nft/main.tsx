import React from 'react';

import {Grid} from '@spinach/next/components/layout/grid';
import {NftListingSingle} from '@spinach/next/components/shared/nft/single';
import {NftListingData} from '@spinach/next/types/nft';


type Props = {
  nfts: NftListingData[]
};

export const NftListing = ({nfts}: Props) => {
  return (
    <Grid className="grid-cols-1 gap-1.5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {nfts.map((nft) => <NftListingSingle key={nft.id} nft={nft}/>)}
    </Grid>
  );
};

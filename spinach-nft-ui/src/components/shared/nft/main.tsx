import React from 'react';

import {Grid} from '@spinach/next/components/layout/grid';
import {NftListingSingle} from '@spinach/next/components/shared/nft/single';
import {NftListingData} from '@spinach/next/components/shared/nft/type';


type Props = {
  nfts: NftListingData[]
};

export const NftListing = ({nfts}: Props) => {
  return (
    <Grid className="grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {nfts.map((nft) => <NftListingSingle key={nft.id} nft={nft}/>)}
    </Grid>
  );
};

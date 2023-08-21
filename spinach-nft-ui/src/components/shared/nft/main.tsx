import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex';
import {NftListingSingle} from '@spinach/next/components/shared/nft/single';
import {NftListingData} from '@spinach/next/components/shared/nft/type';


type Props = {
  nfts: NftListingData[]
};

export const NftListing = ({nfts}: Props) => {
  return (
    <Flex direction="row" wrap className="gap-1.5">
      {nfts.map((nft) => <NftListingSingle key={nft.id} nft={nft}/>)}
    </Flex>
  );
};

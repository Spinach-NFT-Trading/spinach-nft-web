import React from 'react';

import {Nft} from '@spinach/common/types/data/nft';

import {Flex} from '@spinach/next/components/layout/flex';
import {NftListingSingle} from '@spinach/next/components/shared/nft/single';


type Props = {
  nfts: Nft[]
};

export const NftListing = ({nfts}: Props) => {
  return (
    <Flex direction="row" wrap className="gap-1.5">
      {nfts.map((nft) => <NftListingSingle key={nft.id} nft={nft}/>)}
    </Flex>
  );
};

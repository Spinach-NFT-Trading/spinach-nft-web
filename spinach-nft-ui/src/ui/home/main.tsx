import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex';
import {NftListing} from '@spinach/next/components/shared/nft/main';
import {getNftInfoMap, getNftOnSaleList} from '@spinach/next/controller/nft';
import {NftListingData} from '@spinach/next/types/nft';
import {PageLayout} from '@spinach/next/ui/base/layout/common';
import {HomeHeader} from '@spinach/next/ui/home/header';


const getNftListing = async (): Promise<NftListingData[]> => {
  const nftOnSale = await getNftOnSaleList(20).toArray();
  const nftInfoMap = await getNftInfoMap(nftOnSale.map(({id}) => id));

  return nftOnSale.map(({id, price}) => {
    const idString = id.toString();

    return {
      id: idString,
      price,
      ...nftInfoMap[idString],
    } satisfies NftListingData;
  });
};

export const Home = async () => {
  const nfts = await getNftListing();

  return (
    <PageLayout>
      <Flex direction="col" className="gap-2 lg:px-32">
        <HomeHeader/>
        <NftListing nfts={nfts}/>
      </Flex>
    </PageLayout>
  );
};

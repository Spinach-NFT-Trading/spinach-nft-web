import React from 'react';

import {NftListing} from '@spinach/next/components/shared/nft/main';
import {getNftInfoMap, getNftOnSaleList} from '@spinach/next/controller/nft';
import {PageLayout} from '@spinach/next/ui/base/layout';
import {NftListingData} from '@spinach/next/ui/home/type';


const getNftListing = async (): Promise<NftListingData[]> => {
  const nftOnSale = await getNftOnSaleList(20).toArray();
  const nftInfoMap = await getNftInfoMap(nftOnSale.map(({id}) => id));

  return nftOnSale.map(({id, price}) => {
    const idString = id.toString();

    return {
      id: idString,
      image: nftInfoMap[idString].image,
      price,
    } satisfies NftListingData;
  });
};

export const Home = async () => {
  const nfts = await getNftListing();

  return (
    <PageLayout>
      <NftListing nfts={nfts}/>
    </PageLayout>
  );
};

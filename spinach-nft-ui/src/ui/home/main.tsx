import React from 'react';

import {fxMarket} from '@spinach/common/const/fx';
import {getFxRate} from '@spinach/common/controller/actors/fx';
import {getServerSession} from 'next-auth';

import {Flex} from '@spinach/next/components/layout/flex';
import {NftListing} from '@spinach/next/components/shared/nft/main';
import {authOptions} from '@spinach/next/const/auth';
import {getNftInfoMap, getNftOnSaleList} from '@spinach/next/controller/nft';
import {NftListingData} from '@spinach/next/types/nft';
import {PageLayout} from '@spinach/next/ui/base/layout/common';
import {HomeFooter} from '@spinach/next/ui/home/footer/main';
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
  const [
    session,
    nfts,
    currentFx,
  ] = await Promise.all([
    getServerSession(authOptions),
    getNftListing(),
    getFxRate(fxMarket),
  ]);

  return (
    <PageLayout>
      <Flex direction="col" className="gap-2">
        <HomeHeader session={session} currentFx={currentFx}/>
        <NftListing nfts={nfts}/>
        <HomeFooter/>
        <Flex direction="col" className="text-right text-sm md:flex-row md:justify-between">
          <div>&copy; 2018 - 2023 Ozone Networks, Inc.</div>
          <div className="border-slate-300 md:ml-auto">
            隱私權政策服務條款
          </div>
        </Flex>
      </Flex>
    </PageLayout>
  );
};

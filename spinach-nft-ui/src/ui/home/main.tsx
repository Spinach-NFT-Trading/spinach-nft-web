import React from 'react';

import {Nft} from '@spinach/common/types/data/nft';

import {NftListing} from '@spinach/next/components/shared/nft/main';
import {PageLayout} from '@spinach/next/ui/base/layout';


const test: Nft[] = [
  {
    id: '196',
    image: 'https://pks.raenonx.cc/images/pokemon/portrait/196.png',
    price: 200,
  },
  {
    id: '197',
    image: 'https://pks.raenonx.cc/images/pokemon/portrait/197.png',
    price: 180,
  },
  {
    id: '135',
    image: 'https://pks.raenonx.cc/images/pokemon/portrait/135.png',
    price: 150,
  },
];

export const Home = () => {
  return (
    <PageLayout>
      <NftListing nfts={test}/>
    </PageLayout>
  );
};

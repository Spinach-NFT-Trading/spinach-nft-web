'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex';
import {Grid} from '@spinach/next/components/layout/grid';
import {InputBox} from '@spinach/next/components/shared/nft/box';
import {nftListingSortingIcon} from '@spinach/next/components/shared/nft/const';
import {NftListingSingle} from '@spinach/next/components/shared/nft/single';
import {NftListingSortType} from '@spinach/next/components/shared/nft/type';
import {NftListingData} from '@spinach/next/types/nft';


type Props = {
  nfts: NftListingData[]
};

export const NftListing = ({nfts}: Props) => {
  const [priceSearch, setPriceSearch] = React.useState('');
  const [sort, setSort] = React.useState<NftListingSortType>('desc');

  const filteredNfts = nfts
    .filter(({price}) => {
      if (priceSearch === '') {
        return true;
      }

      return price === parseInt(priceSearch);
    })
    .sort((a, b) => {
      if (sort === 'asc') {
        return a.price - b.price;
      }

      if (sort === 'desc') {
        return b.price - a.price;
      }

      throw new Error(`Unhandled sorting type [${sort satisfies never}]`);
    });

  return (
    <Flex direction="col" className="gap-2">
      <Flex direction="row" className="gap-1.5">
        <InputBox
          value={priceSearch}
          type="number"
          className="w-48"
          onChange={({target}) => {
            if (target.value === '') {
              setPriceSearch('');
            }

            const price = parseInt(target.value);

            if (isNaN(price)) {
              return;
            }

            setPriceSearch(target.value);
          }}
        />
        <button className="button-clickable-bg p-1" onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}>
          <div className="relative h-6 w-6">
            {nftListingSortingIcon[sort]}
          </div>
        </button>
      </Flex>
      <Grid className="grid-cols-1 gap-1.5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {filteredNfts.map((nft) => <NftListingSingle key={nft.id} nft={nft}/>)}
      </Grid>
    </Flex>
  );
};

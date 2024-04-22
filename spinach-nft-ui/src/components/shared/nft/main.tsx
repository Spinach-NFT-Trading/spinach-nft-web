'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Grid} from '@spinach/next/components/layout/grid';
import {InputBox} from '@spinach/next/components/shared/common/input/box';
import {nftListingSortingIcon} from '@spinach/next/components/shared/nft/const';
import {NftListingSingle} from '@spinach/next/components/shared/nft/single';
import {NftListingSortType} from '@spinach/next/components/shared/nft/type';
import {NftListingData} from '@spinach/next/types/nft';


type Props = {
  nftListings: NftListingData[],
  isOnSale: boolean,
};

export const NftListing = ({nftListings, isOnSale}: Props) => {
  const [priceSearch, setPriceSearch] = React.useState('');
  const [sort, setSort] = React.useState<NftListingSortType>('desc');

  const filteredNftListings = nftListings
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

      const limitedCompareDiff = +b.isLimited - +a.isLimited;

      if (limitedCompareDiff !== 0) {
        return limitedCompareDiff;
      }

      throw new Error(`Unhandled sorting type [${sort satisfies never}]`);
    });

  return (
    <Flex className="gap-2">
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
      <Grid className="grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filteredNftListings.map((nft) => (
          <NftListingSingle key={nft.id} nft={nft} isOnSale={isOnSale}/>
        ))}
      </Grid>
    </Flex>
  );
};

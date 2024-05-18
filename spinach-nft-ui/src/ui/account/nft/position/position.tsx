'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {NftListing} from '@spinach/next/components/shared/nft/main';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';


export const AccountNftPositionClient = () => {
  return (
    <Flex className="gap-2">
      <div className="text-2xl">NFT</div>
      <UserDataLazyLoad
        options={{
          type: 'nftPosition',
        }}
        loadingText="NFT"
        content={(data) => (
          <NftListing nftListings={data?.nftPosition ?? []} isOnSale={false}/>
        )}
      />
    </Flex>
  );
};

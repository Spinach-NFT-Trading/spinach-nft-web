'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex';
import {NftListing} from '@spinach/next/components/shared/nft/main';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';


export const AccountNftPosition = () => {
  return (
    <Flex direction="col" className="gap-2">
      <div className="text-2xl">NFT</div>
      <UserDataLazyLoad
        type="nftPosition"
        loadingText="NFT"
        content={(data) => (
          <NftListing nfts={data?.nftPosition ?? []}/>
        )}
      />
    </Flex>
  );
};

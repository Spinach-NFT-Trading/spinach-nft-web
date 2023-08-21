'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex';
import {NftListing} from '@spinach/next/components/shared/nft/main';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';


export const AccountProfileClient = () => {
  return (
    <Flex direction="col" className="gap-2">
      <div className="text-lg">NFT</div>
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

import React from 'react';

import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import clsx from 'clsx';
import Link from 'next/link';

import {Flex} from '@spinach/next/components/layout/flex';
import {NextImage} from '@spinach/next/components/shared/common/image';
import {NftListingData} from '@spinach/next/components/shared/nft/type';
import {formatInt} from '@spinach/next/utils/number';


export type Props = {
  nft: NftListingData,
};

export const NftListingSingle = ({nft}: Props) => {
  return (
    <Flex direction="col" center className="info-section">
      <pre className="text-xs">
        {nft.id}
      </pre>
      <div className="relative h-40 w-40">
        <NextImage src={nft.image} alt={`NFT #${nft.id}`}/>
      </div>
      {
        nft.price &&
        <Flex direction="col" className="items-end gap-1 md:flex-row">
          <Link href={`/nft/purchase/${nft.id}`} className="button-clickable-bg p-1">
            <div className="h-5 w-5">
              <ShoppingCartIcon/>
            </div>
          </Link>
          <div className="ml-auto">
            {formatInt(nft.price)} GOLD
          </div>
        </Flex>
      }
    </Flex>
  );
};

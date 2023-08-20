import React from 'react';

import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import clsx from 'clsx';
import Link from 'next/link';

import {Flex} from '@spinach/next/components/layout/flex';
import {NextImage} from '@spinach/next/components/shared/common/image';
import {NftListingData} from '@spinach/next/ui/home/type';


export type Props = {
  nft: NftListingData,
};

export const NftListingSingle = ({nft}: Props) => {
  return (
    <Flex direction="col" center className={clsx(
      'info-section width-with-gap-sm width-with-gap-2-items sm:width-with-gap-3-items',
      'md:width-with-gap-4-items lg:width-with-gap-5-items',
    )}>
      <pre className="text-xs">
        {nft.id}
      </pre>
      <div className="relative h-40 w-40">
        <NextImage src={nft.image} alt={`NFT #${nft.id}`}/>
      </div>
      <Flex direction="col" className="items-end">
        <Link href={`/nft/purchase/${nft.id}`} className="button-clickable-bg p-1">
          <div className="h-5 w-5">
            <ShoppingCartIcon/>
          </div>
        </Link>
      </Flex>
    </Flex>
  );
};

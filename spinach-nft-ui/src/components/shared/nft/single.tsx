import React from 'react';

import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import {Nft} from '@spinach/common/types/data/nft';
import clsx from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex';
import {NextImage} from '@spinach/next/components/shared/common/image';


type Props = {
  nft: Nft,
};

export const NftListingSingle = ({nft}: Props) => {
  return (
    <Flex direction="col" center className={clsx(
      'info-section width-with-gap-sm width-with-gap-2-items sm:width-with-gap-3-items',
      'md:width-with-gap-4-items lg:width-with-gap-5-items',
    )}>
      <div>
        #{nft.id}
      </div>
      <div className="relative h-20 w-20">
        <NextImage src={nft.image} alt={`NFT #${nft.id}`}/>
      </div>
      <Flex direction="col" className="items-end">
        <button className="button-clickable-bg p-1">
          <div className="h-5 w-5">
            <ShoppingCartIcon/>
          </div>
        </button>
      </Flex>
    </Flex>
  );
};

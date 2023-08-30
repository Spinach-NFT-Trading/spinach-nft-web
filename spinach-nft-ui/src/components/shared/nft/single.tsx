import React from 'react';

import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import CheckBadgeIcon from '@heroicons/react/24/solid/CheckBadgeIcon';
import Link from 'next/link';

import {Flex} from '@spinach/next/components/layout/flex';
import {NextImage} from '@spinach/next/components/shared/common/image';
import {NftListingData} from '@spinach/next/types/nft';
import {formatInt} from '@spinach/next/utils/number';


export type Props = {
  nft: NftListingData,
};

export const NftListingSingle = ({nft}: Props) => {
  const {id, image, isLimited, seqId, price} = nft;

  return (
    <Flex direction="row" className="info-section items-center gap-4">
      <Flex direction="col" noFullWidth>
        <div className="relative h-20 w-20">
          <NextImage src={image} alt={`NFT #${id}`} className="rounded-lg"/>
        </div>
      </Flex>
      <Flex direction="col" className="text-xl font-semibold">
        <Flex direction="row" className="items-center gap-1">
          <div>#{seqId}</div>
          {
            isLimited &&
            <div className="relative h-6 w-6 text-teal-400">
              <CheckBadgeIcon/>
            </div>
          }
        </Flex>
        <Flex direction="col" className="whitespace-nowrap text-yellow-300">
          {formatInt(price)} GOLD
        </Flex>
      </Flex>
      <Flex direction="col" noFullWidth>
        <Link href={`/nft/purchase/${id}`} className="button-clickable-bg p-3">
          <div className="h-10 w-10">
            <ShoppingCartIcon/>
          </div>
        </Link>
      </Flex>
    </Flex>
  );
};

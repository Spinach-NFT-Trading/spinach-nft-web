import React from 'react';

import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import CheckBadgeIcon from '@heroicons/react/24/solid/CheckBadgeIcon';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {NftListingData} from '@spinach/next/types/nft';
import {formatInt} from '@spinach/next/utils/number/format';


export type Props = {
  nft: NftListingData,
  isOnSale: boolean,
  extraInfo?: React.ReactNode,
};

export const NftListingSingle = ({nft, isOnSale, extraInfo}: Props) => {
  const {id, image, isLimited, seqId, price} = nft;

  return (
    <Flex direction="row" className="info-section items-center gap-4">
      <Flex noFullWidth>
        <div className="relative size-20">
          <NextImage src={image} alt={`NFT #${id}`} className="rounded-lg"/>
        </div>
      </Flex>
      <Flex className="text-xl font-semibold">
        <Flex direction="row" className="items-center gap-1">
          <div>#{seqId}</div>
          {
            isLimited &&
            <div className="relative size-6 text-teal-400">
              <CheckBadgeIcon/>
            </div>
          }
        </Flex>
        <Flex className="whitespace-nowrap text-yellow-300">
          {formatInt(price)} GOLD
        </Flex>
        {extraInfo}
      </Flex>
      {
        isOnSale &&
        <Flex noFullWidth>
          <FlexLink href={`/nft/purchase/${id}`} className="button-clickable-bg p-3">
            <div className="size-10">
              <ShoppingCartIcon/>
            </div>
          </FlexLink>
        </Flex>
      }
    </Flex>
  );
};

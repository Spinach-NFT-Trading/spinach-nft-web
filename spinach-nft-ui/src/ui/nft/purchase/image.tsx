import React from 'react';

import ShareIcon from '@heroicons/react/24/outline/ShareIcon';
import HeartIcon from '@heroicons/react/24/solid/HeartIcon';

import {UsdtIcon} from '@spinach/next/components/icons/usdt';
import {Flex} from '@spinach/next/components/layout/flex';
import {NextImage} from '@spinach/next/components/shared/common/image';
import {NftPurchaseSectionProps} from '@spinach/next/ui/nft/purchase/type';


export const NftPurchaseImage = ({info, onSale}: NftPurchaseSectionProps) => {
  return (
    <Flex direction="col" center className="info-section gap-3">
      <Flex direction="row">
        <Flex direction="row">
          <div className="h-10 w-10">
            <UsdtIcon/>
          </div>
        </Flex>
        <Flex direction="row" noFullWidth className="gap-3">
          <div className="h-10 w-10">
            <ShareIcon/>
          </div>
          <div className="h-10 w-10">
            <HeartIcon/>
          </div>
        </Flex>
      </Flex>
      <Flex direction="col" center className="h-full">
        <div className="relative h-80 w-80">
          <NextImage src={info.image} alt={`NFT #${onSale.id}`}/>
        </div>
      </Flex>
    </Flex>
  );
};

import React from 'react';

import ShareIcon from '@heroicons/react/24/outline/ShareIcon';
import HeartIcon from '@heroicons/react/24/solid/HeartIcon';

import {UsdtIcon} from '@spinach/next/components/icons/usdt';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {NextImageSquare} from '@spinach/next/components/shared/common/image/square';
import {NftPurchaseSectionProps} from '@spinach/next/ui/nft/purchase/type';


export const NftPurchaseImage = ({info, onSale}: NftPurchaseSectionProps) => {
  return (
    <Flex className="info-section-bg rounded-lg">
      <Flex direction="row" className="p-4">
        <Flex direction="row">
          <div className="size-10">
            <UsdtIcon/>
          </div>
        </Flex>
        <Flex direction="row" noFullWidth className="gap-3">
          <div className="size-10">
            <ShareIcon/>
          </div>
          <div className="size-10">
            <HeartIcon/>
          </div>
        </Flex>
      </Flex>
      <NextImageSquare src={info.image} alt={`NFT #${onSale.id}`}/>
    </Flex>
  );
};

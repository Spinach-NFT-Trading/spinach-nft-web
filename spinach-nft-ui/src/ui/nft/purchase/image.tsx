import React from 'react';

import ShareIcon from '@heroicons/react/24/outline/ShareIcon';
import HeartIcon from '@heroicons/react/24/solid/HeartIcon';

import {UsdtIcon} from '@spinach/next/components/icons/usdt';
import {Flex} from '@spinach/next/components/layout/flex';
import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {NftPurchaseSectionProps} from '@spinach/next/ui/nft/purchase/type';


export const NftPurchaseImage = ({info, onSale}: NftPurchaseSectionProps) => {
  return (
    <Flex className="info-section-bg rounded-lg">
      <Flex direction="row" className="p-4">
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
      <div className="relative w-full overflow-hidden before:block before:pt-[100%] before:content-['']">
        <div className="absolute inset-0">
          <NextImage src={info.image} alt={`NFT #${onSale.id}`}/>
        </div>
      </div>
    </Flex>
  );
};

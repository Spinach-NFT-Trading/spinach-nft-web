import React from 'react';

import CheckBadgeIcon from '@heroicons/react/24/solid/CheckBadgeIcon';
import {format} from 'date-fns/format';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {NftPurchaseButton} from '@spinach/next/ui/nft/purchase/button';
import {NftPurchaseInfoSection} from '@spinach/next/ui/nft/purchase/infoSection';
import {NftPurchaseSectionProps} from '@spinach/next/ui/nft/purchase/type';


type Props = NftPurchaseSectionProps & {
  nftId: string,
  onSaleTimestamp: Date,
};

export const NftPurchaseInfo = ({nftId, info, onSale, onSaleTimestamp}: Props) => {
  const {isLimited, seqId} = info;

  const t = useTranslations('UI.InPage.Nft.Purchase.Info');

  return (
    <Flex className="info-section gap-3">
      <Flex direction="row" className="items-center gap-1 text-3xl">
        <div>#{seqId}</div>
        {
          isLimited &&
          <div className="relative size-10 text-teal-400">
            <CheckBadgeIcon/>
          </div>
        }
      </Flex>
      <div className="info-section w-fit">
        #{info.tokenId}
      </div>
      <NftPurchaseInfoSection title={t('Id')} content={nftId}/>
      <NftPurchaseInfoSection title={t('OnSaleTimestamp')} content={format(onSaleTimestamp, 'yyyy-MM-dd HH:mm:ss')}/>
      <NftPurchaseInfoSection title={t('Description')} content={`by ${info.maker}`}/>
      <NftPurchaseInfoSection title={t('Price')} content={`${onSale.price} GOLD`}/>
      <NftPurchaseButton nftId={nftId} isLimited={isLimited}/>
    </Flex>
  );
};

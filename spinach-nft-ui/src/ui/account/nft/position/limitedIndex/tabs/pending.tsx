import React from 'react';

import {toNonNullishArray} from '@spinach/common/utils/array';
import {useTranslations} from 'next-intl';

import {useNftPositionLimitedData} from '@spinach/next/ui/account/nft/position/limitedIndex/context/hook';
import {NftPositionLimitedListingLayout} from '@spinach/next/ui/account/nft/position/limitedIndex/layout/listing';


export const NftPositionLimitedPendingContent = () => {
  const t = useTranslations('UI.InPage.NftPosition.Limited.Pending');

  const {pending, nftListingMap} = useNftPositionLimitedData();

  return (
    <NftPositionLimitedListingLayout
      nftListing={toNonNullishArray(pending.map(({nftId}) => nftListingMap[nftId]))}
      emptyText={t('Empty')}
    />
  );
};

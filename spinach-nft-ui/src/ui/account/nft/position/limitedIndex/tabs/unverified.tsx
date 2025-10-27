import React from 'react';

import {toNonNullishArray} from '@spinach/common/utils/array';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {useNftPositionLimitedData} from '@spinach/next/ui/account/nft/position/limitedIndex/context/hook';
import {NftPositionLimitedListingLayout} from '@spinach/next/ui/account/nft/position/limitedIndex/layout/listing';


export const NftPositionLimitedUnverifiedContent = () => {
  const t = useTranslations('UI.InPage.NftPosition.Limited.Unverified');

  const {unverified, nftListingMap} = useNftPositionLimitedData();

  return (
    <NftPositionLimitedListingLayout
      nftListing={toNonNullishArray(unverified.map(({nftId}) => nftListingMap[nftId]))}
      emptyText={t('Empty')}
      getExtraInfo={({id, bankAccount}) => (
        <Flex>
          <span>
            <small>{t('BankAccount')}:</small>&nbsp;{bankAccount}
          </span>
          <FlexLink className="text-link ml-auto w-fit text-sm" href={`/account/nft/position/limited/proof/${id}`}>
            {t('ClickToUpload')}
          </FlexLink>
        </Flex>
      )}
    />
  );
};


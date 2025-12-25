import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';


export const NftPurchaseConfirmLimitedMessage = () => {
  const t = useTranslations('UI.InPage.Nft.Purchase');

  return (
    <Flex className="info-section gap-1">
      <p className="text-left">
        {t('LimitedMessage.Line1')}
      </p>
      <p className="text-left">
        {t('LimitedMessage.Line2')}
      </p>
    </Flex>
  );
};

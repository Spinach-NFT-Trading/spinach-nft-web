import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';


export const NftPurchaseConfirmDisclaimer = () => {
  const t = useTranslations('UI.InPage.Nft.Purchase');

  return (
    <Flex className="info-section gap-1">
      <div className="text-2xl">{t('Disclaimer.Title')}</div>
      <p
        className="h-[40vh] overflow-y-scroll text-left"
        dangerouslySetInnerHTML={{__html: t.raw('Disclaimer.Content')}}
      />
    </Flex>
  );
};

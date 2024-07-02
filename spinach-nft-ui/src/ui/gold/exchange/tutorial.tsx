import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';


export const GoldExchangeCryptoTutorial = () => {
  const t = useTranslations('UI.InPage.Gold.Exchange.Tutorial');

  return (
    <Flex center className="info-section gap-2">
      <a href="https://youtu.be/bkCavlothfY" target="_blank" className="text-link">
        {t('CreateMaxAccount')}
      </a>
      <a href="https://youtu.be/R5qtrq4n_fQ" target="_blank" className="text-link">
        {t('BuyUsdt')}
      </a>
      <a href="https://youtu.be/sydHSLaSDS8" target="_blank" className="text-link">
        {t('CheckWalletAddress')}
      </a>
    </Flex>
  );
};

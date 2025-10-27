import React from 'react';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {NftPositionLimitedClient} from '@spinach/next/ui/nft/position/limited/client';


export const NftPositionLimitedPage = async () => {
  return (
    <I18nProvider>
      <NftPositionLimitedClient/>
    </I18nProvider>
  );
};


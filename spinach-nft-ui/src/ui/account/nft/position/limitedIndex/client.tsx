'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {useTabbedContentControl} from '@spinach/next/components/layout/tab/hook';
import {TabbedContent} from '@spinach/next/components/layout/tab/main';
import {NftPositionLimitedPendingContent} from '@spinach/next/ui/account/nft/position/limitedIndex/tabs/pending';
import {NftPositionLimitedUnverifiedContent} from '@spinach/next/ui/account/nft/position/limitedIndex/tabs/unverified';
import {
  NftPositionLimitedTab,
  nftPositionLimitedTabs,
} from '@spinach/next/ui/account/nft/position/limitedIndex/type';


export const NftPositionLimitedClient = () => {
  const tabControl = useTabbedContentControl<NftPositionLimitedTab>('unverified');

  const t = useTranslations('UI.InPage.NftPosition.Limited.Tabs');

  return (
    <TabbedContent
      keys={[...nftPositionLimitedTabs]}
      control={tabControl}
      tabTitle={{
        unverified: t('Unverified'),
        pending: t('Pending'),
      }}
      content={{
        unverified: <NftPositionLimitedUnverifiedContent/>,
        pending: <NftPositionLimitedPendingContent/>,
      }}
      getReactKey={(key) => key}
      classOfContents="p-2"
    />
  );
};

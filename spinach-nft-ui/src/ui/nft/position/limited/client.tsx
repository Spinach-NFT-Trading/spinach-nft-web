'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {useTabbedContentControl} from '@spinach/next/components/layout/tab/hook';
import {TabbedContent} from '@spinach/next/components/layout/tab/main';
import {NftPositionLimitedTab, nftPositionLimitedTabs} from '@spinach/next/ui/nft/position/limited/type';


export const NftPositionLimitedClient = () => {
  const tabControl = useTabbedContentControl<NftPositionLimitedTab>('pending');

  const t = useTranslations('UI.InPage.NftPosition.Limited.Tabs');

  return (
    <TabbedContent
      keys={[...nftPositionLimitedTabs]}
      control={tabControl}
      tabTitle={{
        pending: t('Pending'),
        completed: t('Completed'),
      }}
      content={{
        pending: (
          <div className="p-4">
            <h2 className="mb-4 text-xl font-semibold">待匯款 NFT</h2>
            <p className="text-gray-500">Pending NFT positions will be displayed here...</p>
          </div>
        ),
        completed: (
          <div className="p-4">
            <h2 className="mb-4 text-xl font-semibold">已獲得 NFT</h2>
            <p className="text-gray-500">Completed NFT positions will be displayed here...</p>
          </div>
        ),
      }}
      getReactKey={(key) => key}
      classOfContents="p-2"
    />
  );
};


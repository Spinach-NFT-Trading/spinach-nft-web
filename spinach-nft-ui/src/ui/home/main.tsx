import React from 'react';

import {getServerSession} from 'next-auth';
import {getTranslations} from 'next-intl/server';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {NftListing} from '@spinach/next/components/shared/nft/main';
import {authOptions} from '@spinach/next/const/auth';
import {getNftListing} from '@spinach/next/controller/nft/utils';
import {PageLayout} from '@spinach/next/ui/base/layout/base/common';
import {HomeFooter} from '@spinach/next/ui/home/footer/main';
import {HomeHeader} from '@spinach/next/ui/home/header';


export const Home = async () => {
  const [
    session,
    nfts,
    t,
  ] = await Promise.all([
    getServerSession(authOptions),
    getNftListing(20),
    getTranslations('UI.InPage.Home'),
  ]);

  return (
    <PageLayout>
      <Flex className="gap-2">
        <HomeHeader session={session}/>
        <NftListing nftListings={nfts} isOnSale/>
        <HomeFooter/>
        <Flex className="text-right text-sm md:flex-row md:justify-between">
          <div>&copy; 2018 - 2024 Ozone Networks, Inc.</div>
          <div className="border-slate-300 md:ml-auto">
            {t('PrivacyPolicy')}
          </div>
        </Flex>
      </Flex>
    </PageLayout>
  );
};

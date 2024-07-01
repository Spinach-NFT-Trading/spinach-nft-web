import React from 'react';

import {ObjectId} from 'mongodb';
import {getServerSession} from 'next-auth';
import {getTranslations} from 'next-intl/server';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {Failed} from '@spinach/next/components/icons/failed';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {NftListingSingle} from '@spinach/next/components/shared/nft/single';
import {authOptions} from '@spinach/next/const/auth';
import {getNftInfo} from '@spinach/next/controller/nft/info';
import {getNftOnSale} from '@spinach/next/controller/nft/onSale';
import {getNftListing} from '@spinach/next/controller/nft/utils';
import {NextPageProps} from '@spinach/next/types/next/page';
import {LoginRequiredPageLayout} from '@spinach/next/ui/base/layout/loginRequired';
import {NftPurchaseImage} from '@spinach/next/ui/nft/purchase/image';
import {NftPurchaseInfo} from '@spinach/next/ui/nft/purchase/info';
import {NftPurchaseSectionProps} from '@spinach/next/ui/nft/purchase/type';


type PageParams = {
  id: string,
};

export const NftPurchase = async ({params}: NextPageProps<PageParams>) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <SignIn/>;
  }

  const nftId = new ObjectId(params.id);
  const [
    onSale,
    recommendedNfts,
    info,
    t,
  ] = await Promise.all([
    getNftOnSale(nftId),
    getNftListing(3),
    getNftInfo(nftId),
    getTranslations('UI.InPage.Nft.Purchase.Error'),
  ]);

  if (!onSale) {
    return <Failed text={t('NotOnSale')}/>;
  }

  if (!info) {
    return <Failed text={t('NotFound')}/>;
  }

  const onSaleTimestamp = onSale._id.getTimestamp();

  const props: NftPurchaseSectionProps = {info, onSale};

  return (
    <LoginRequiredPageLayout>
      <I18nProvider namespaces={['UI.InPage.Nft.Purchase']}>
        <Flex className="gap-2 md:flex-row">
          <NftPurchaseImage {...props}/>
          <Flex className="gap-2">
            <NftPurchaseInfo nftId={nftId.toString()} onSaleTimestamp={onSaleTimestamp} {...props}/>
            {recommendedNfts.map((nft) => <NftListingSingle key={nft.id} nft={nft} isOnSale/>)}
          </Flex>
        </Flex>
      </I18nProvider>
    </LoginRequiredPageLayout>
  );
};

import React from 'react';

import {ObjectId} from 'mongodb';
import {getServerSession} from 'next-auth';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {Failed} from '@spinach/next/components/icons/failed';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {NftListingSingle} from '@spinach/next/components/shared/nft/single';
import {authOptions} from '@spinach/next/const/auth';
import {getNftInfo, getNftListing, getNftOnSale} from '@spinach/next/controller/nft';
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
  ] = await Promise.all([
    getNftOnSale(nftId),
    getNftListing(3),
    getNftInfo(nftId),
  ]);

  if (!onSale) {
    return <Failed text="On Sale"/>;
  }

  if (!info) {
    return <Failed text="NFT Info"/>;
  }

  const onSaleTimestamp = onSale._id.getTimestamp();

  const props: NftPurchaseSectionProps = {info, onSale};

  return (
    <LoginRequiredPageLayout>
      <Flex className="gap-2 md:flex-row">
        <NftPurchaseImage {...props}/>
        <Flex className="gap-2">
          <NftPurchaseInfo nftId={nftId.toString()} onSaleTimestamp={onSaleTimestamp} {...props}/>
          {recommendedNfts.map((nft) => <NftListingSingle key={nft.id} nft={nft}/>)}
        </Flex>
      </Flex>
    </LoginRequiredPageLayout>
  );
};

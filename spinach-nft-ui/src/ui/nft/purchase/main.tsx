import React from 'react';

import {ObjectId} from 'mongodb';
import {getServerSession} from 'next-auth';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {Failed} from '@spinach/next/components/icons/failed';
import {Grid} from '@spinach/next/components/layout/grid';
import {authOptions} from '@spinach/next/const/auth';
import {getNftInfo, getNftOnSale} from '@spinach/next/controller/nft';
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
  const [onSale, info] = await Promise.all([
    getNftOnSale(nftId),
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
      <Grid className="grid-rows-2 gap-4 md:grid-cols-2">
        <NftPurchaseImage {...props}/>
        <NftPurchaseInfo nftId={nftId.toString()} onSaleTimestamp={onSaleTimestamp} {...props}/>
      </Grid>
    </LoginRequiredPageLayout>
  );
};

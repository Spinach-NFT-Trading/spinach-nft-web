import React from 'react';

import {ObjectId} from 'mongodb';
import {getServerSession} from 'next-auth';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {Failed} from '@spinach/next/components/icons/failed';
import {Flex} from '@spinach/next/components/layout/flex';
import {NextImage} from '@spinach/next/components/shared/common/image';
import {authOptions} from '@spinach/next/const/auth';
import {getNftInfo, getNftOnSale} from '@spinach/next/controller/nft';
import {PageProps} from '@spinach/next/types/next/page';
import {NftPurchaseButton} from '@spinach/next/ui/nft/purchase/button';


type PageParams = {
  id: string,
};

export const NftPurchase = async ({params}: PageProps<PageParams>) => {
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

  return (
    <Flex direction="col" center className="gap-1">
      <pre>{onSale.id.toString()}</pre>
      <div className="relative h-60 w-60">
        <NextImage src={info.image} alt={`NFT #${onSale.id}`}/>
      </div>
      <Flex direction="col" className="items-end">
        {onSale.price}&nbsp;GOLD
      </Flex>
      <Flex direction="col">
        <NftPurchaseButton/>
      </Flex>
    </Flex>
  );
};

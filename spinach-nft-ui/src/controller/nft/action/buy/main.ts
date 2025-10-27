import {ApiErrorCode} from '@spinach/common/types/api/error';
import {NftTxnModel} from '@spinach/common/types/data/nft';
import {ObjectId} from 'mongodb';

import {getNftInfo} from '@spinach/next/controller/nft/info';
import {getNftOnSale} from '@spinach/next/controller/nft/onSale';

import {handleLimitedNftPurchase} from './limited';
import {handleNormalNftPurchase} from './normal';


type BuyNftOpts = {
  buyer: ObjectId,
  nftId: ObjectId,
};

export const buyNft = async ({buyer, nftId}: BuyNftOpts): Promise<ApiErrorCode | null> => {
  const [nftOnSale, nftInfo] = await Promise.all([
    getNftOnSale(nftId),
    getNftInfo(nftId),
  ]);

  if (!nftOnSale) {
    return 'nftNotOnSale';
  }

  if (!nftInfo) {
    return 'nftInfoNotFound';
  }

  const txn: NftTxnModel = {
    nftId: nftOnSale.id,
    from: nftOnSale.seller,
    to: buyer,
    price: nftOnSale.price,
  };

  if (nftInfo.isLimited) {
    return handleLimitedNftPurchase({buyer, nftOnSale, txn});
  }

  return handleNormalNftPurchase({buyer, nftOnSale, txn});
};


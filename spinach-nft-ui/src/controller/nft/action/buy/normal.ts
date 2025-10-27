import {getGoldAsset, recordUserDataAfterNftTxn} from '@spinach/common/controller/actors/user';
import {nftOnSaleCollection, nftTxnCollection} from '@spinach/common/controller/collections/nft';
import {Mongo} from '@spinach/common/controller/const';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {NftOnSaleModel, NftTxnModel} from '@spinach/common/types/data/nft';
import {ObjectId} from 'mongodb';


export type HandleNormalNftPurchaseOpts = {
  buyer: ObjectId,
  nftOnSale: NftOnSaleModel,
};

export const handleNormalNftPurchase = async ({
  buyer,
  nftOnSale,
}: HandleNormalNftPurchaseOpts): Promise<ApiErrorCode | null> => {
  const balance = await getGoldAsset({userId: buyer});

  if (!balance || balance.current <= nftOnSale.price) {
    return 'goldNotEnough';
  }

  const txn: NftTxnModel = {
    nftId: nftOnSale.id,
    from: nftOnSale.seller,
    to: buyer,
    price: nftOnSale.price,
  };

  await Mongo.withSession(async (session) => {
    await session.withTransaction(async () => {
      const nftTxn = await nftTxnCollection.insertOne(txn, {session});

      await recordUserDataAfterNftTxn({
        nftTxnId: nftTxn.insertedId,
        nftTxn: txn,
        session,
      });

      // Mark NFT sold
      await nftOnSaleCollection.deleteOne({id: nftOnSale.id});
    });
  });

  return null;
};


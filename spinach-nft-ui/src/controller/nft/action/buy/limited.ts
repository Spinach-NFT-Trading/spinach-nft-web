import {
  nftLimitedUnverifiedCollection,
  nftOnSaleCollection,
  nftTxnCollection,
} from '@spinach/common/controller/collections/nft';
import {Mongo} from '@spinach/common/controller/const';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {NftOnSaleModel, NftTxnModel} from '@spinach/common/types/data/nft';
import {ObjectId} from 'mongodb';
import {v4} from 'uuid';


export type HandleLimitedNftPurchaseOpts = {
  buyer: ObjectId,
  nftOnSale: NftOnSaleModel,
  txn: NftTxnModel,
};

export const handleLimitedNftPurchase = async ({
  buyer,
  nftOnSale,
  txn,
}: HandleLimitedNftPurchaseOpts): Promise<ApiErrorCode | null> => {
  const nftId = nftOnSale.id;

  await Mongo.withSession(async (session) => {
    await session.withTransaction(async () => {
      const nftTxn = await nftTxnCollection.insertOne(txn, {session});

      await nftLimitedUnverifiedCollection.insertOne({
        uuid: v4(),
        nftId,
        nftTxnId: nftTxn.insertedId,
        buyer,
      }, {session});

      // Mark NFT sold
      await nftOnSaleCollection.deleteOne({id: nftId}, {session});
    });
  });

  return null;
};

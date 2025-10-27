import {nftLimitedPendingCollection, nftOnSaleCollection} from '@spinach/common/controller/collections/nft';
import {Mongo} from '@spinach/common/controller/const';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {NftLimitedPendingModel} from '@spinach/common/types/data/nft/limited';
import {ObjectId} from 'mongodb';


export type HandleLimitedNftPurchaseOpts = {
  buyer: ObjectId,
  nftId: ObjectId,
};

export const handleLimitedNftPurchase = async ({
  buyer,
  nftId,
}: HandleLimitedNftPurchaseOpts): Promise<ApiErrorCode | null> => {
  const pending: NftLimitedPendingModel = {
    nftId,
    buyer,
  };

  await Mongo.withSession(async (session) => {
    await session.withTransaction(async () => {
      await nftLimitedPendingCollection.insertOne(pending, {session});

      // Mark NFT sold
      await nftOnSaleCollection.deleteOne({id: nftId}, {session});
    });
  });

  return null;
};


'use server';
import {
  nftLimitedUnverifiedCollection,
  nftLimitedPendingCollection,
} from '@spinach/common/controller/collections/nft';
import {Mongo} from '@spinach/common/controller/const';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {
  NftLimitedUnverifiedModel,
  NftLimitedUnverifiedModelClient,
  NftLimitedPendingModel,
  NftLimitedPendingModelClient,
} from '@spinach/common/types/data/nft/limited';
import {ObjectId} from 'mongodb';

import {getDataAsArray} from '@spinach/next/controller/common';
import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


export const getNftLimitedUnverifiedClient = async (userId: ObjectId): Promise<NftLimitedUnverifiedModelClient[]> => {
  const data = await getDataAsArray(nftLimitedUnverifiedCollection, {buyer: userId});

  return data.map((item: NftLimitedUnverifiedModel) => ({
    uuid: item.uuid,
    nftId: item.nftId.toHexString(),
    nftTxnId: item.nftTxnId.toHexString(),
    buyer: item.buyer.toHexString(),
  }));
};

export const getNftLimitedPendingClient = async (userId: ObjectId): Promise<NftLimitedPendingModelClient[]> => {
  const data = await getDataAsArray(nftLimitedPendingCollection, {buyer: userId});

  return data.map((item: NftLimitedPendingModel) => ({
    uuid: item.uuid,
    nftId: item.nftId.toHexString(),
    nftTxnId: item.nftTxnId.toHexString(),
    buyer: item.buyer.toHexString(),
    proofUploadId: item.proofUploadId,
  }));
};

type SubmitLimitedNftPurchaseProofOpts = ControllerRequireUserIdOpts & {
  nftId: string,
  proofUploadId: string,
};

export const submitLimitedNftPurchaseProof = async ({
  executorUserId,
  nftId,
  proofUploadId,
}: SubmitLimitedNftPurchaseProofOpts): Promise<ApiErrorCode | null> => {
  const buyer = new ObjectId(executorUserId);
  const nftObjectId = new ObjectId(nftId);

  return await Mongo.withSession(async (session) => {
    return session.withTransaction(async (): Promise<ApiErrorCode | null> => {
      const unverified = await nftLimitedUnverifiedCollection.findOne(
        {nftId: nftObjectId, buyer},
        {session},
      );
      if (!unverified) {
        return 'nftUnverifiedLimitedNotFound';
      }

      await nftLimitedPendingCollection.insertOne(
        {
          uuid: unverified.uuid,
          nftId: unverified.nftId,
          nftTxnId: unverified.nftTxnId,
          buyer: unverified.buyer,
          proofUploadId,
        },
        {session},
      );

      await nftLimitedUnverifiedCollection.deleteOne({_id: unverified._id}, {session});
      return null;
    });
  });
};

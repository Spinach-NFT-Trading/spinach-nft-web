'use server';
import {upsertNftPosition} from '@spinach/common/controller/actors/nft';
import {azureContainer} from '@spinach/common/controller/blob/const';
import {getImageBlob} from '@spinach/common/controller/blob/get';
import {
  nftInfoCollection,
  nftLimitedPendingCollection,
  nftLimitedUnverifiedCollection,
} from '@spinach/common/controller/collections/nft';
import {Mongo} from '@spinach/common/controller/const';
import {throwIfNotPrivileged} from '@spinach/common/controller/user/permission';
import {getDataAsArray} from '@spinach/common/controller/utils/common';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {
  NftLimitedPendingModel,
  NftLimitedPendingModelClient,
  NftLimitedUnverifiedModel,
  NftLimitedUnverifiedModelClient,
} from '@spinach/common/types/data/nft/limited';
import {ObjectId} from 'mongodb';

import {getNftTxnById} from '@spinach/next/controller/nft/txn';
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

type GetLimitedNftProofImageOpts = ControllerRequireUserIdOpts & {
  uuid: string,
};

export const getLimitedNftProofImage = async ({
  executorUserId,
  uuid,
}: GetLimitedNftProofImageOpts) => {
  await throwIfNotPrivileged(executorUserId);

  const pending = await nftLimitedPendingCollection.findOne({uuid});
  if (!pending) {
    return null;
  }

  return await getImageBlob({
    container: azureContainer.pool,
    name: pending.proofUploadId,
  });
};

type VerifyLimitedNftPurchaseOpts = ControllerRequireUserIdOpts & {
  uuid: string,
  pass: boolean,
};

export const verifyLimitedNftPurchase = async ({
  executorUserId,
  uuid,
  pass,
}: VerifyLimitedNftPurchaseOpts): Promise<ApiErrorCode | null> => {
  await throwIfNotPrivileged(executorUserId);

  return await Mongo.withSession(async (session) => session.withTransaction(async (): Promise<ApiErrorCode | null> => {
    const pending = await nftLimitedPendingCollection.findOne(
      {uuid},
      {session},
    );
    if (pending == null) {
      return 'nftUnverifiedLimitedNotFound';
    }

    if (!pass) {
      // Reject: Put the pending data back into unverified
      await Promise.all([
        nftLimitedPendingCollection.deleteOne({_id: pending._id}, {session}),
        nftLimitedUnverifiedCollection.insertOne({
          uuid: pending.uuid,
          nftId: pending.nftId,
          nftTxnId: pending.nftTxnId,
          buyer: pending.buyer,
        }, {session}),
      ]);
      return null;
    }

    const nftTxn = await getNftTxnById(pending.nftTxnId);
    if (nftTxn == null) {
      throw new Error(
        `NFT TxN ${pending.nftTxnId.toHexString()} not found for unverified limited NFT purchase ${pending._id}`,
      );
    }

    // Approve: Delete from pending, also change the NFT to normal and register the NFT to position
    await Promise.all([
      nftLimitedPendingCollection.deleteOne({_id: pending._id}, {session}),
      upsertNftPosition({nftTxn, session}),
      nftInfoCollection.updateOne({_id: pending.nftId}, {$set: {isLimited: false}}),
    ]);
    return null;
  }));
};

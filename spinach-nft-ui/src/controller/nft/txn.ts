import {nftTxnCollection} from '@spinach/common/controller/collections/nft';
import {throwIfNotElevated} from '@spinach/common/controller/user/permission';
import {NftTxnModel} from '@spinach/common/types/data/nft';
import {ObjectId, WithId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {toIdRangeFromLookBackRequest} from '@spinach/next/controller/user/utils';
import {NftTxnModelClient} from '@spinach/next/types/mongo/nft';
import {DataLookBackRequestOnUser} from '@spinach/next/types/userData/load';


const toNftTxnModelClient = ({_id, from, to, nftId, ...rest}: WithId<NftTxnModel>): NftTxnModelClient => ({
  ...rest,
  epochMs: _id.getTimestamp().getTime(),
  from: from.toHexString(),
  to: to.toHexString(),
  nftId: nftId.toHexString(),
  id: _id.toHexString(),
});

export type GetNftTxnOfUserOpts = ControllerRequireUserIdOpts & DataLookBackRequestOnUser;

export const getNftTxnOfUser = async ({
  executorUserId,
  userId,
  ...request
}: GetNftTxnOfUserOpts): Promise<NftTxnModelClient[]> => {
  await throwIfNotElevated(executorUserId);

  const userObjectId = new ObjectId(userId);

  return nftTxnCollection.find({
    $or: [
      {from: userObjectId},
      {to: userObjectId},
    ],
    ...toIdRangeFromLookBackRequest(request),
  })
    .sort({_id: 1})
    .map(toNftTxnModelClient)
    .toArray();
};

export const getNftTxnById = (txnId: ObjectId) => {
  return nftTxnCollection.findOne({_id: txnId});
};

export const getNftTxnByIds = async (txnIds: string[]): Promise<NftTxnModelClient[]> => {
  return nftTxnCollection.find({_id: {$in: txnIds.map((id) => new ObjectId(id))}})
    .map(toNftTxnModelClient)
    .toArray();
};

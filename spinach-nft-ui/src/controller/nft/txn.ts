import {nftTxnCollection} from '@spinach/common/controller/collections/nft';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {toIdRangeFromLookBackRequest} from '@spinach/next/controller/user/utils';
import {throwIfNotElevated} from '@spinach/next/controller/utils';
import {NftTxnModelClient} from '@spinach/next/types/mongo/nft';
import {DataLookBackRequestOnUser} from '@spinach/next/types/userData/load';


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
    .map(({
      from,
      to,
      nftId,
      _id,
      ...rest
    }): NftTxnModelClient => ({
      ...rest,
      epochMs: _id.getTimestamp().getTime(),
      from: from.toHexString(),
      to: to.toHexString(),
      nftId: nftId.toHexString(),
      id: _id.toHexString(),
    }))
    .toArray();
};

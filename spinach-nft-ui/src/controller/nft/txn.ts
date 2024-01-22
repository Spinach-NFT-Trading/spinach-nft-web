import {nftTxnCollection} from '@spinach/common/controller/collections/nft';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {toIdRangeFromLookBackRequest} from '@spinach/next/controller/user/utils';
import {throwIfNotAdminOrAgent} from '@spinach/next/controller/utils';
import {NftTxnModelClient} from '@spinach/next/types/mongo/nft';
import {DataLookBackRequest} from '@spinach/next/types/userData/load';


export type GetNftTxnOfUserOpts = ControllerRequireUserIdOpts & DataLookBackRequest;

export const getNftTxnOfUser = async ({
  executorUserId,
  ...request
}: GetNftTxnOfUserOpts): Promise<NftTxnModelClient[]> => {
  const {userId} = request;
  await throwIfNotAdminOrAgent(executorUserId);

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

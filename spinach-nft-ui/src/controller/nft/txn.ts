import {nftTxnCollection} from '@spinach/common/controller/collections/nft';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {throwIfNotAdminOrAgent} from '@spinach/next/controller/utils';
import {NftTxnModelClient} from '@spinach/next/types/mongo/nft';


export type GetNftTxnOfUserOpts = ControllerRequireUserIdOpts & {
  userId: string,
};

export const getNftTxnOfUser = async ({executorUserId, userId}: GetNftTxnOfUserOpts): Promise<NftTxnModelClient[]> => {
  await throwIfNotAdminOrAgent(executorUserId);

  const userObjectId = new ObjectId(userId);

  return nftTxnCollection.find({$or: [{from: userObjectId}, {to: userObjectId}]})
    .map(({
      from,
      to,
      nftId,
      _id,
      ...rest
    }): NftTxnModelClient => ({
      ...rest,
      from: from.toHexString(),
      to: to.toHexString(),
      nftId: nftId.toHexString(),
      id: _id.toHexString(),
    }))
    .toArray();
};

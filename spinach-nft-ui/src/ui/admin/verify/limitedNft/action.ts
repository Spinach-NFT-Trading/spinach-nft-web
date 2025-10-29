'use server';
import {nftLimitedPendingCollection} from '@spinach/common/controller/collections/nft';
import {throwIfNotPrivileged} from '@spinach/common/controller/user/permission';
import {getDataAsArray} from '@spinach/common/controller/utils/common';
import {NftLimitedPendingModel, NftLimitedPendingModelClient} from '@spinach/common/types/data/nft/limited';
import {toUnique} from '@spinach/common/utils/array';
import {toObject} from '@spinach/common/utils/object/make';
import {ObjectId} from 'mongodb';

import {getNftInfoMap} from '@spinach/next/controller/nft/info';
import {getNftTxnByIds} from '@spinach/next/controller/nft/txn';
import {getUserDataMap} from '@spinach/next/controller/user/info';
import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {AdminVerifyLimitedNftData} from '@spinach/next/ui/admin/verify/limitedNft/type';


export const getAdminVerifyLimitedNftData = async ({
  executorUserId,
}: ControllerRequireUserIdOpts): Promise<AdminVerifyLimitedNftData> => {
  await throwIfNotPrivileged(executorUserId);

  const pending = (await getDataAsArray(nftLimitedPendingCollection, {})).map((
    item: NftLimitedPendingModel,
  ): NftLimitedPendingModelClient => ({
    uuid: item.uuid,
    nftId: item.nftId.toHexString(),
    nftTxnId: item.nftTxnId.toHexString(),
    buyer: item.buyer.toHexString(),
    proofUploadId: item.proofUploadId,
  }));

  const [
    userDataMap,
    nftInfoMap,
    nftTxns,
  ] = await Promise.all([
    getUserDataMap(toUnique(pending.map(({buyer}) => buyer))),
    getNftInfoMap(toUnique(pending.map(({nftId}) => new ObjectId(nftId)))),
    getNftTxnByIds(pending.map(({nftTxnId}) => nftTxnId)),
  ]);

  const nftTxnMap = toObject(
    nftTxns,
    (txn) => [txn.id, txn],
  );

  return {
    userDataMap,
    nftInfoMap,
    nftTxnMap,
    pending: pending,
  };
};

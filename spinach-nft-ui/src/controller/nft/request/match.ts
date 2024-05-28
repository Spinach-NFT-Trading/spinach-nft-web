'use server';
import {nftExchangeMatchedCollection} from '@spinach/common/controller/collections/nft';
import {userNftPositionCollection} from '@spinach/common/controller/collections/user';
import {
  NftExchangeMatchedBundle,
  NftExchangeMatchedData,
  NftExchangeMatchedModel,
} from '@spinach/common/types/data/nft/match';
import {subDays} from 'date-fns/subDays';
import {Filter, ObjectId} from 'mongodb';
import {revalidatePath} from 'next/cache';

import {getDataAsArray} from '@spinach/next/controller/common';
import {recordSessionPoll} from '@spinach/next/controller/session/poll';
import {getBankDetailsMap} from '@spinach/next/controller/user/bankDetails';
import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {NftExchangeMatchedModelAtClient} from '@spinach/next/types/nft';


type GetMatchedNftExchangeRequestsOpts = ControllerRequireUserIdOpts;

export const getMatchedNftExchangeRequests = async ({
  executorUserId,
}: GetMatchedNftExchangeRequestsOpts): Promise<NftExchangeMatchedModelAtClient[]> => {
  // Force revalidating cache every time because there's a bug that
  // when "NFT sell request received" pops, clicking on it to redirect to the confirmation page
  // doesn't show the newly added match - possibly due to the caching mechanism
  revalidatePath('/account/nft/exchange');

  await recordSessionPoll({executorUserId});

  const nftPositions = await userNftPositionCollection
    .find({owner: new ObjectId(executorUserId)}).map(({nftId}) => nftId)
    .toArray();

  return (await getDataAsArray(nftExchangeMatchedCollection, {nftId: {$in: nftPositions}}))
    .map(({nftId, ...original}) => ({
      ...original,
      nftId: nftId.toHexString(),
    }));
};

export const getNftExchangeMatchedBundle = async (filter: Filter<NftExchangeMatchedModel>) => {
  const data = await nftExchangeMatchedCollection
    .find(filter)
    .map(({_id, nftId, completedAt, ...data}): NftExchangeMatchedData => ({
      nftId: nftId.toHexString(),
      matchedAtEpochMs: _id.getTimestamp().getTime(),
      completedAtEpochMs: completedAt?.getTime() ?? null,
      ...data,
    }))
    .toArray();

  const bankDetailsMap = await getBankDetailsMap([
    ...new Set(data.flatMap(({bankDetailsUuid}) => bankDetailsUuid)),
  ]);

  return {data, bankDetailsMap};
};

export const getNftExchangeRequestsMatched = (): Promise<NftExchangeMatchedBundle> => {
  return getNftExchangeMatchedBundle({completedAt: null});
};

export const getNftExchangeRequestsCompleted = async (): Promise<NftExchangeMatchedBundle> => {
  return getNftExchangeMatchedBundle({completedAt: {$gt: subDays(new Date(), 1)}});
};

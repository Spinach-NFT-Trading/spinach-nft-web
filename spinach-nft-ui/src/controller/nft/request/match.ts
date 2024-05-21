'use server';
import {nftExchangeMatchedCollection} from '@spinach/common/controller/collections/nft';
import {userNftPositionCollection} from '@spinach/common/controller/collections/user';
import {ObjectId} from 'mongodb';
import {revalidatePath} from 'next/cache';

import {getDataAsArray} from '@spinach/next/controller/common';
import {recordSessionPoll} from '@spinach/next/controller/session/poll';
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

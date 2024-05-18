'use server';
import {nftExchangeMatchedCollection} from '@spinach/common/controller/collections/nft';
import {userNftPositionCollection} from '@spinach/common/controller/collections/user';
import {ObjectId} from 'mongodb';

import {getDataAsArray} from '@spinach/next/controller/common';
import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {NftExchangeMatchedModelAtClient} from '@spinach/next/types/nft';


type GetMatchedNftExchangeRequestsOpts = ControllerRequireUserIdOpts;

export const getMatchedNftExchangeRequests = async ({
  executorUserId,
}: GetMatchedNftExchangeRequestsOpts): Promise<NftExchangeMatchedModelAtClient[]> => {
  const nftPositions = await userNftPositionCollection
    .find({owner: new ObjectId(executorUserId)}).map(({nftId}) => nftId)
    .toArray();

  return (await getDataAsArray(nftExchangeMatchedCollection, {nftId: {$in: nftPositions}}))
    .map(({nftId, ...original}) => ({
      ...original,
      nftId: nftId.toHexString(),
    }));
};

'use server';
import {nftExchangeQueueCollection} from '@spinach/common/controller/collections/nft';
import {NftExchangeQueuedData} from '@spinach/common/types/data/nft/queue';


export const getNftExchangeRequestsQueued = (): Promise<NftExchangeQueuedData[]> => (
  nftExchangeQueueCollection
    .find()
    .map(({_id, ...data}): NftExchangeQueuedData => ({
      createdAtEpochMs: _id.getTimestamp().getTime(),
      ...data,
    }))
    .toArray()
);

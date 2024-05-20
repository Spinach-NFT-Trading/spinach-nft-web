import {nftExchangeQueueCollection} from '@spinach/common/controller/collections/nft';
import {requestNftExchangeSingle} from '@spinach/common/controller/nft/exchange/single/main';


export const checkQueuedNftExchangeRequests = async () => {
  console.log('Checking queued NFT exchange requests');

  for (const queued of await nftExchangeQueueCollection.find().toArray()) {
    console.log(`Checking queued request ${queued.requestUuid}`);
    await requestNftExchangeSingle(queued);
  }
};

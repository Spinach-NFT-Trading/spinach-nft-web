import {nftExchangeQueueCollection} from '@spinach/common/controller/collections/nft';
import {requestNftExchangeSingle} from '@spinach/common/controller/nft/exchange/single/main';


export const checkQueuedNftExchangeRequests = async () => {
  console.log('Checking queued NFT exchange requests');
  // Return of promises are ignored because queued requests only gets handled by webhook
  await Promise.all((await nftExchangeQueueCollection.find().toArray()).map(requestNftExchangeSingle));
};

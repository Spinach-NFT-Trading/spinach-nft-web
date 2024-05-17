import {checkQueuedNftExchangeRequests} from '@spinach/common/controller/nft/exchange/check';


export const scheduleQueuedNftExchangeRequestPeriodicCheck = () => {
  setInterval(() => {
    checkQueuedNftExchangeRequests()
      .catch((err) => console.error('Failed to check queued NFT exchange requests', err));
  }, 10000);
};

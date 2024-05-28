import {NftExchangeQueuedData} from '@spinach/common/types/data/nft/queue';


export type AdminExchangeRequestsQueuedState = {
  lastUpdated: Date,
  data: NftExchangeQueuedData[],
};

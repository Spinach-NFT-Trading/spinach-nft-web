import {NftExchangeQueuedModel} from '@spinach/common/types/data/nft/queue';


export type AdminQueuedExchangeState = {
  lastUpdated: Date,
  data: NftExchangeQueuedModel[],
};

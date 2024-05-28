import {NftExchangeMatchedBundle} from '@spinach/common/types/data/nft/match';


export type AdminExchangeRequestsMatchedState = NftExchangeMatchedBundle & {
  lastUpdated: Date,
};

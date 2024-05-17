import {NftExchangeRequest} from '@spinach/common/types/api/nft/exchange';


export type NftExchangeRequestCommonOpts = NftExchangeRequest & {
  requestUuid: string,
};

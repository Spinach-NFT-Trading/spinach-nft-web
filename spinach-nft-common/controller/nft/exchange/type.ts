import {NftExchangeRequest} from '@spinach/common/types/api/nft/exchange';
import {NftExchangeTokenModel} from '@spinach/common/types/data/nft/token';


export type NftExchangeRequestCommonOpts = {
  requestBody: NftExchangeRequest,
  requestUuid: string,
  tokenModel: NftExchangeTokenModel,
};

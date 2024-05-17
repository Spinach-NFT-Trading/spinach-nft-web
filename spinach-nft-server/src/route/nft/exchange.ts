import {apiPath} from '@spinach/common/const/path';
import {requestNftExchange} from '@spinach/common/controller/nft/exchange/request';
import {
  NftExchangeRequest,
  NftExchangeRequestSchema,
  NftExchangeResponse,
  NftExchangeResponseSchema,
} from '@spinach/common/types/api/nft/exchange';

import {Server} from '@spinach/server/const';


export const addNftExchangeRequest = () => {
  Server.post<{Body: NftExchangeRequest, Reply: NftExchangeResponse}>(
    apiPath.nft.exchange,
    {
      schema: {
        body: NftExchangeRequestSchema,
        response: {
          200: NftExchangeResponseSchema,
        },
      },
    },
    async ({body}): Promise<NftExchangeResponse> => ({
      success: true,
      data: await requestNftExchange(body),
    }),
  );
};

import {apiPath} from '@spinach/common/const/path';
import {requestNftExchange} from '@spinach/common/controller/nft/exchange/request';
import {getNftExchangeToken} from '@spinach/common/controller/nft/exchange/token';
import {ApiErrorResponseSchema} from '@spinach/common/types/api/error';
import {
  NftExchangeRequest,
  NftExchangeRequestSchema,
  NftExchangeResponse,
  NftExchangeResponseSchema,
} from '@spinach/common/types/api/nft/exchange';

import {Server} from '@spinach/server/const';
import {getAuthorizationToken} from '@spinach/server/utils/auth';


export const addNftExchangeRequest = () => {
  Server.post<{Body: NftExchangeRequest, Reply: NftExchangeResponse}>(
    apiPath.nft.exchange,
    {
      schema: {
        body: NftExchangeRequestSchema,
        response: {
          200: NftExchangeResponseSchema,
          403: ApiErrorResponseSchema,
        },
      },
    },
    async (request, reply): Promise<NftExchangeResponse> => {
      // Extract token from authorization header
      const {token: requestedToken} = getAuthorizationToken({request});
      if (!requestedToken) {
        reply.code(403);
        return {
          success: false,
          error: 'unauthorized',
        };
      }

      // Validate token against nftExchangeTokenCollection
      const tokenModel = await getNftExchangeToken({token: requestedToken});
      if (!tokenModel) {
        reply.code(403);
        return {
          success: false,
          error: 'unauthorized',
        };
      }

      return {
        success: true,
        data: await requestNftExchange({requestBody: request.body, tokenModel}),
      };
    },
  );
};

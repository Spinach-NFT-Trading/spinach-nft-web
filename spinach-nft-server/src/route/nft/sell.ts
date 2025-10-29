import {apiPath} from '@spinach/common/const/path';
import {getNftExchangeToken} from '@spinach/common/controller/nft/exchange/token';
import {
  NftSellRequest,
  NftSellRequestSchema,
  NftSellResponse,
  NftSellResponseSchema,
} from '@spinach/common/types/api/nft/sell';

import {Server} from '@spinach/server/const';
import {sellLimitedNft} from '@spinach/server/controller/nft/sellLimited';
import {getAuthorizationToken} from '@spinach/server/utils/auth';


export const addNftSellRequest = () => {
  Server.post<{Body: NftSellRequest, Reply: NftSellResponse}>(
    apiPath.nft.sell,
    {
      schema: {
        body: NftSellRequestSchema,
        response: {
          200: NftSellResponseSchema,
          403: NftSellResponseSchema,
        },
      },
    },
    async (request, reply): Promise<NftSellResponse> => {
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
      if (tokenModel == null) {
        reply.code(403);
        return {
          success: false,
          error: 'unauthorized',
        };
      }

      return {
        success: true,
        data: await sellLimitedNft({request: request.body, requestedToken}),
      };
    },
  );
};

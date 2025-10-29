import {apiPath} from '@spinach/common/const/path';
import {getNftExchangeToken} from '@spinach/common/controller/nft/exchange/token';
import {ApiErrorResponseSchema} from '@spinach/common/types/api/error';
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
        description: '從平台上架限時 NFT。娛樂城需要在 HTTP Header 中提供平台給予娛樂城的 Token。',
        body: NftSellRequestSchema,
        response: {
          200: {
            ...NftSellResponseSchema,
            description: '成功處理 NFT 出售請求。返回已建立的限時 NFT ID。',
          },
          403: {
            ...ApiErrorResponseSchema,
            description: '未經授權的請求。可能是授權權杖遺失或無效。詳情請見 API 錯誤碼。',
          },
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

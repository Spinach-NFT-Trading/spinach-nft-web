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
import {NftExchangeRequestWebhookPayloadSchema} from '@spinach/common/types/webhook/nftExchange';

import {Server} from '@spinach/server/const';
import {getAuthorizationToken} from '@spinach/server/utils/auth';


export const addNftExchangeRequest = () => {
  Server.post<{Body: NftExchangeRequest, Reply: NftExchangeResponse}>(
    apiPath.nft.exchange,
    {
      schema: {
        description:
          '平台收到來自此端點的請求後，會尋找平台內會員所持有的 NFT 並匹配，然後將相關資訊透過 Webhook 發回娛樂城。\n' +
          '娛樂城需要在 HTTP Header 中提供平台給予娛樂城的 Token。',
        body: NftExchangeRequestSchema,
        response: {
          200: {
            ...NftExchangeResponseSchema,
            description: '成功處理 NFT 交換請求。如果找到配對，則返回使用者銀行資訊；否則返回請求 UUID。',
          },
          403: {
            ...ApiErrorResponseSchema,
            description: '未經授權的請求。可能是授權權杖遺失或無效。詳情請見 API 錯誤碼。',
          },
        },
        // @ts-expect-error: Fastify doesn't support callbacks typing
        callbacks: {
          onEvent: {
            '{$request.body#/callbackUrl}': {
              post: {
                summary: 'NFT 匹配資訊 Webhook',
                description: '平台無視 Webhook 回傳的狀態碼。回傳 204 即可。',
                requestBody: {
                  required: true,
                  content: {
                    'application/json': {
                      schema: NftExchangeRequestWebhookPayloadSchema,
                    },
                  },
                },
              },
            },
          },
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

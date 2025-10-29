import {fastifyCors} from '@fastify/cors';
import {fastifyHelmet} from '@fastify/helmet';
import multipart, {FastifyMultipartBaseOptions} from '@fastify/multipart';

import {Server} from '@spinach/server/const';
import {CorsAllowedOrigins} from '@spinach/server/env';


export const registerPlugins = async () => {
  const logObj = {origins: CorsAllowedOrigins};
  Server.log.info(logObj, 'CORS allowed origins: %s', logObj.origins);

  await Server.register(fastifyHelmet);
  await Server.register(
    fastifyCors,
    {
      origin: CorsAllowedOrigins,
      methods: ['GET', 'POST'],
    },
  );
  await Server.register(require('@fastify/swagger'), {
    prefix: '/docs',
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'TG Market NFT 交易 API',
        description: [
          '# 初次使用',
          '',
          '娛樂城需要向平台獲取 API token，並且提供可以接收 HTTP POST (JSON) 的 Webhook 的網址。',
          '',
          '## 流程',
          '',
          '娛樂城可以透過文件中的各 API 端口主動使用 API。',
          '另外，娛樂城發送 NFT 販賣請求後，平台如果成功撮合 NFT 交易，娛樂城提供的 Webhook 會收到通知。',
        ].join('\n'),
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:4011',
          description: 'Development',
        },
        {
          url: 'https://server.tg8888.net',
          description: 'Production',
        },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'token',
            name: 'token',
            in: 'header',
          },
        },
      },
      externalDocs: {
        // eslint-disable-next-line max-len
        url: 'https://sparkxenon-992580.postman.co/workspace/Spinach~1e0a45bd-93c7-4713-8b87-e29df24ee499/api/6d942dec-147d-4d13-9e10-982993a5be0d?action=share&creator=49642509&active-environment=49642509-2d7623bb-eb11-4b1a-88f8-0630c354a865',
        description: 'Postman',
      },
    },
  });
  await Server.register(require('@fastify/swagger-ui'));
  await Server.register(
    multipart,
    {
      limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
      },
    } satisfies FastifyMultipartBaseOptions,
  );
};

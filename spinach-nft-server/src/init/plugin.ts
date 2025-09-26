import multipart, {FastifyMultipartBaseOptions} from '@fastify/multipart';

import {Server} from '@spinach/server/const';


export const registerServerPlugins = async () => {
  // For file uploading endpoints
  await Server.register(
    multipart,
    {
      limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
      },
    } satisfies FastifyMultipartBaseOptions,
  );
};

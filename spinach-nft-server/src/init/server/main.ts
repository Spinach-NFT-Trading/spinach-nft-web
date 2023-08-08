import {TypeBoxTypeProvider} from '@fastify/type-provider-typebox';
import {fastify, FastifyInstance} from 'fastify';
import {getEnvironment} from 'spinach-nft-common/utils/env';

import {getLogOptions} from '@/init/server/loggerOpts';
import {registerMiddlewares} from '@/init/server/middleware';


type InitServerOpts = {
  logDir: string,
  appName: string,
  afterBuild?: (server: FastifyInstance) => void,
};

export const initServer = ({appName, logDir, afterBuild}: InitServerOpts) => {
  const server = fastify({
    logger: getLogOptions({
      appName,
      logDir,
      environment: getEnvironment().toLowerCase(),
    }),
    trustProxy: true,
  })
    .withTypeProvider<TypeBoxTypeProvider>();

  registerMiddlewares(server);
  if (afterBuild) {
    afterBuild(server);
  }

  return server;
};

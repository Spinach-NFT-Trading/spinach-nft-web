import {TypeBoxTypeProvider} from '@fastify/type-provider-typebox';
import {getEnvironment} from '@spinach/common/utils/env';
import {fastify, FastifyInstance} from 'fastify';

import {getLogOptions} from '@spinach/server/init/server/loggerOpts';
import {registerMiddlewares} from '@spinach/server/init/server/middleware';


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

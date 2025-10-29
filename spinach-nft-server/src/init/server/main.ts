import {TypeBoxTypeProvider} from '@fastify/type-provider-typebox';
import {getEnvironment} from '@spinach/common/utils/env';
import {fastify, FastifyInstance} from 'fastify';

import {getLogOptions} from '@spinach/server/init/server/loggerOpts';
import {registerPlugins} from '@spinach/server/init/server/plugins';


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
    bodyLimit: 20 * 1024 * 1024, // Default limit set to 20 MB
  })
    .withTypeProvider<TypeBoxTypeProvider>();

  registerPlugins(server);
  if (afterBuild) {
    afterBuild(server);
  }

  return server;
};

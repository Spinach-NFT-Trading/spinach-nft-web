import {TypeBoxTypeProvider} from '@fastify/type-provider-typebox';
import {getEnvironment} from '@spinach/common/utils/env';
import {fastify} from 'fastify';

import {getLogOptions} from '@spinach/server/init/server/loggerOpts';


type InitServerOpts = {
  logDir: string,
  appName: string,
};

export const initServer = ({appName, logDir}: InitServerOpts) => {
  return fastify({
    logger: getLogOptions({
      appName,
      logDir,
      environment: getEnvironment().toLowerCase(),
    }),
    trustProxy: true,
    bodyLimit: 20 * 1024 * 1024, // Default limit set to 20 MB
  })
    .withTypeProvider<TypeBoxTypeProvider>();
};

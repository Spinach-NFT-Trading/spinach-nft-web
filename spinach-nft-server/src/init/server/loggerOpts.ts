import * as path from 'path';

import {FastifyLoggerOptions, FastifyServerOptions} from 'fastify';
// eslint-disable-next-line import/no-unresolved
import {PinoLoggerOptions} from 'fastify/types/logger';
import {TransportTargetOptions} from 'pino';
import {getEnvironment} from 'spinach-nft-common/utils/env';


type GetPinoFileTransportOpts = {
  appName: string,
  logDir: string,
};

// `transport` for `pino-pretty` disables the `file` option of `fastify` in logger options
const getPinoFileTransport = ({appName, logDir}: GetPinoFileTransportOpts): TransportTargetOptions => {
  return {
    level: 'info',
    target: 'pino/file',
    options: {
      destination: path.join(logDir, `${appName}.${getEnvironment()}.log`),
      mkdir: true,
    },
  };
};

const commonOptions: FastifyLoggerOptions & PinoLoggerOptions = {
  // New Relic reserved
  // ...require('@newrelic/pino-enricher')(),
  formatters: {
    log: (context) => {
      // Add `application` to logging context for easier log searching on NR1
      context.application = context['entity.name'];

      // Copied from `@newrelic/pino-enricher` because `formatters` is overridden by the above patch
      if (context.err) {
        const err = context.err as {name: string, message: string, stack: string};

        context['error.message'] = err.message;
        context['error.stack'] = err.stack;
        context['error.class'] = err.name === 'Error' ? context.err.constructor.name : err.name;
        delete context.err;
      }
      return context;
    },
  },
  serializers: {
    res: (reply) => {
      return {
        statusCode: reply.statusCode,
        url: reply.request?.url ?? '(No URL)',
      };
    },
  },
};

type GetLogOptionsOpts = GetPinoFileTransportOpts & {
  environment: string,
};

export const getLogOptions = ({environment, ...opts}: GetLogOptionsOpts): FastifyServerOptions['logger'] => {
  const transportOpts = getPinoFileTransport(opts);

  if (environment === 'development') {
    return {
      transport: {
        targets: [
          transportOpts,
          {
            level: 'info',
            target: 'pino-pretty',
            options: {
              translateTime: 'yyyy-mm-dd HH:MM:ss Z',
            },
          },
        ],
      },
      ...commonOptions,
    };
  }

  if (environment === 'production') {
    return {
      transport: transportOpts,
      ...commonOptions,
    };
  }

  return environment !== 'test';
};

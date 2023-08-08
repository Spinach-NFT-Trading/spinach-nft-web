import {fastifyCors} from '@fastify/cors';
import {fastifyHelmet} from '@fastify/helmet';
import {FastifyInstance} from 'fastify';

import {CorsAllowedOrigins} from '@/env';


export const registerMiddlewares = (server: FastifyInstance) => {
  const logObj = {origins: CorsAllowedOrigins};
  server.log.info(logObj, 'CORS allowed origins: %s', logObj.origins);

  server.register(fastifyHelmet);
  server.register(
    fastifyCors,
    {
      origin: CorsAllowedOrigins,
      methods: ['GET', 'POST'],
    },
  );
};

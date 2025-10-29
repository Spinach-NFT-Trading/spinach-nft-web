import '@fastify/swagger';
import {TypeBoxTypeProvider} from '@fastify/type-provider-typebox';


declare module 'fastify' {
  export interface FastifyTypeProviderDefault extends TypeBoxTypeProvider {}
}

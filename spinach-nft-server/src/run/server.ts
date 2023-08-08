import {exit} from 'node:process';

import {FastifyInstance} from 'fastify';


type RunFastifyOpts = {
  server: FastifyInstance,
  host: string,
  port: number,
};

export const runFastify = async ({server, host, port}: RunFastifyOpts) => {
  try {
    await server.listen({host, port});
    const addresses = server.addresses();

    server.log.info(
      {addresses},
      'Server listening on %s',
      addresses.map(({address, family, port}) => `${address}:${port} (${family})`).join(', '),
    );
  } catch (err) {
    console.error(err);
    exit(1);
  }
};

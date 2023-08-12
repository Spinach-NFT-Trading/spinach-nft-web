// eslint-disable-next-line import/order
import * as dotenv from 'dotenv';


dotenv.config({path: '.env.local', override: true});

import {Logger, Server} from '@spinach/server/const';
import {ApiHost, ApiPort} from '@spinach/server/env';
import {initApp} from '@spinach/server/init/main';
import {runFastify} from '@spinach/server/run/server';


(async () => {
  initApp();

  await runFastify({server: Server, host: ApiHost, port: ApiPort});
})().catch((error) => {
  Logger.error({error}, `Application start up error (%s)`, error.toString());
  console.error(error);
  process.exit(1);
});

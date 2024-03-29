import * as dotenv from 'dotenv';


dotenv.config();

// eslint-disable-next-line import/order
import {exit} from 'node:process';

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
  exit(1);
});

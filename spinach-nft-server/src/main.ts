// eslint-disable-next-line import/order
import * as dotenv from 'dotenv';


dotenv.config({path: '.env.local', override: true});

import {Logger, Server} from '@/const';
import {ApiHost, ApiPort} from '@/env';
import {initApp} from '@/init/main';
import {runFastify} from '@/run/server';


(async () => {
  initApp();

  await runFastify({server: Server, host: ApiHost, port: ApiPort});
})().catch((error) => {
  Logger.error({error}, `Application start up error (%s)`, error.toString());
  console.error(error);
  process.exit(1);
});

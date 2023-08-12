import {LogDir} from '@spinach/server/env';
import {initServer} from '@spinach/server/init/server/main';


export const Server = initServer({
  appName: 'Spinach.NFT.Server',
  logDir: LogDir,
});

export const Logger = Server.log;

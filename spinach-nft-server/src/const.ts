import {LogDir} from '@/env';
import {initServer} from '@/init/server/main';


export const Server = initServer({
  appName: 'Spinach.NFT.Server',
  logDir: LogDir,
});

export const Logger = Server.log;

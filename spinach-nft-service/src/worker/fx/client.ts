import {WebSocket} from 'ws';

import {maxWebsocketUrl} from '@spinach/service/worker/fx/const';


export const getMaxWebsocketClient = () => {
  const ws = new WebSocket(maxWebsocketUrl);

  return ws
    // Keep alive
    .on('open', () => {
      setInterval(() => ws.ping('ping'), 30000);
    })
    .on('pong', () => void 0);
};

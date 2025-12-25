import {fxMarket} from '@spinach/common/const/fx';

import {updateFxRate} from '@spinach/service/controller/fx/main';
import {getMaxWebsocketClient} from '@spinach/service/worker/fx/client';
import {MaxWsMessage} from '@spinach/service/worker/fx/type';


export const trackFxRateOnMax = () => {
  const ws = getMaxWebsocketClient()
    .once('open', () => {
      ws.send(JSON.stringify({
        action: 'sub',
        subscriptions: [
          {channel: 'trade', market: fxMarket},
        ],
        id: 'USDT-TWD FX check',
      }));
    })
    .on('message', (data) => {
      const message = JSON.parse(data.toString()) as MaxWsMessage;

      const event = message.e;

      if (event === 'subscribed') {
        console.log(`Subscribed to ${message.i}`);
        return;
      }

      const channel = message.c;

      if (channel === 'trade') {
        const price = message.t.at(-1)?.p;

        if (!price) {
          return;
        }

        console.log(`Received trade update \`${message.M}\` @ ${price}`);

        updateFxRate({market: message.M, px: price, lastUpdateEpoch: message.T})
          .catch((error) => {
            console.error('Failed to update FX rate', error);
            ws.terminate();
          });
        return;
      }

      console.log(`Skipped handling max message of channel [${JSON.stringify(message)}]`);
    });
};

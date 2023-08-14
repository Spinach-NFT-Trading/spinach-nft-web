import {TronApiKey} from '@spinach/service/env';


type TronGetRequestOpts = {
  endpoint: string,
};

export const tronGetRequest = ({endpoint}: TronGetRequestOpts) => {
  return fetch(
    endpoint,
    {
      method: 'GET',
      headers: {
        'TRON-PRO-API-KEY': TronApiKey,
      },
    },
  );
};

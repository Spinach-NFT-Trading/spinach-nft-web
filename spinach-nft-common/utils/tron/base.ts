import * as env from 'env-var';


const TronApiKey = env.get('SPINACH_TRON_API_KEY').required().asString();

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

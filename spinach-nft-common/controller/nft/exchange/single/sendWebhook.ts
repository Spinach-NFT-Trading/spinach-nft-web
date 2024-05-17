import {NftExchangeTokenModel} from '@spinach/common/types/data/nft/token';
import {NftExchangeRequestWebhookPayload} from '@spinach/common/types/webhook/nftExchange';


type RequestNftExchangeSingleSendWebhookOpts = {
  requestToken: NftExchangeTokenModel,
  payload: NftExchangeRequestWebhookPayload,
};

export const requestNftExchangeSingleSendWebhook = async ({
  requestToken,
  payload,
}: RequestNftExchangeSingleSendWebhookOpts) => {
  const {webhook} = requestToken;

  await fetch(
    webhook,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload satisfies NftExchangeRequestWebhookPayload),
    },
  );
};

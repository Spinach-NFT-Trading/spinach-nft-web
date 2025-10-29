import {NftExchangeTokenModel} from '@spinach/common/types/data/nft/token';
import {BankPublicDetails} from '@spinach/common/types/data/user/bank';
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

  const {requestUuid, amount, bankDetails} = payload;
  const sanitizedPayload: NftExchangeRequestWebhookPayload = {
    requestUuid,
    amount,
    // Ensure returning public details only
    bankDetails: bankDetails.map(({code, account}): BankPublicDetails => ({code, account})),
  };

  try {
    await fetch(
      webhook,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(sanitizedPayload),
      },
    );
  } catch (e) {
    console.error('Failed to send webhook', e);
  }
};

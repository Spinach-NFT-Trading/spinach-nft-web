import {v4} from 'uuid';

import {nftExchangeQueueCollection} from '@spinach/common/controller/collections/nft';
import {requestNftExchangeSingle} from '@spinach/common/controller/nft/exchange/single/main';
import {NftExchangeRequestCommonOpts} from '@spinach/common/controller/nft/exchange/type';
import {NftExchangeRequest, NftExchangeResult} from '@spinach/common/types/api/nft/exchange';


const queueNftExchangeRequest = async ({
  requestUuid,
  token,
  amount,
}: NftExchangeRequestCommonOpts) => {
  await nftExchangeQueueCollection.insertOne({
    requestUuid,
    token,
    amount,
  });
};

export type RequestNftExchangeOpts = NftExchangeRequest;

export const requestNftExchange = async (opts: RequestNftExchangeOpts): Promise<NftExchangeResult> => {
  const requestUuid = v4();

  const commonOpts: NftExchangeRequestCommonOpts = {
    requestUuid,
    ...opts,
  };

  const exchangeResult = await requestNftExchangeSingle(commonOpts);

  if (!exchangeResult) {
    await queueNftExchangeRequest(commonOpts);

    return {result: 'queued', requestUuid};
  }

  return {
    result: 'found',
    userId: exchangeResult.nftSold.owner.toHexString(),
    bankDetails: exchangeResult.bankDetails,
  };
};

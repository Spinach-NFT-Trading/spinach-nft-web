import {v4} from 'uuid';

import {nftExchangeQueueCollection} from '@spinach/common/controller/collections/nft';
import {requestNftExchangeSingle} from '@spinach/common/controller/nft/exchange/single/main';
import {NftExchangeRequestCommonOpts} from '@spinach/common/controller/nft/exchange/type';
import {NftExchangeRequest, NftExchangeResult} from '@spinach/common/types/api/nft/exchange';
import {NftExchangeTokenModel} from '@spinach/common/types/data/nft/token';
import {BankPublicDetails} from '@spinach/common/types/data/user/bank';


const queueNftExchangeRequest = async ({
  requestBody,
  requestUuid,
  tokenModel,
}: NftExchangeRequestCommonOpts) => {
  await nftExchangeQueueCollection.insertOne({
    requestUuid,
    token: tokenModel.token,
    amount: requestBody.amount,
  });
};

export type RequestNftExchangeOpts = {
  requestBody: NftExchangeRequest,
  tokenModel: NftExchangeTokenModel
};

export const requestNftExchange = async ({
  requestBody,
  tokenModel,
}: RequestNftExchangeOpts): Promise<NftExchangeResult> => {
  const requestUuid = v4();

  const commonOpts: NftExchangeRequestCommonOpts = {
    requestBody,
    requestUuid,
    tokenModel,
  };

  const exchangeResult = await requestNftExchangeSingle(commonOpts);
  if (!exchangeResult) {
    await queueNftExchangeRequest(commonOpts);

    return {result: 'queued', requestUuid};
  }

  return {
    result: 'found',
    userId: exchangeResult.nftSold.owner.toHexString(),
    bankDetails: exchangeResult.bankDetails.map(({code, account}): BankPublicDetails => ({code, account})),
  };
};

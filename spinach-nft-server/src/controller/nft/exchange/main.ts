import {userBankDetailsCollection} from '@spinach/common/controller/collections/user';
import {NftExchangeRequest, NftExchangeResult} from '@spinach/common/types/api/nft/exchange';
import {v4} from 'uuid';

import {addNftExchangeRequestToQueue} from '@spinach/server/controller/nft/exchange/queue';
import {requestNftExchangeSingle} from '@spinach/server/controller/nft/exchange/single';


export type RequestNftExchangeOpts = NftExchangeRequest;

export const requestNftExchange = async (opts: RequestNftExchangeOpts): Promise<NftExchangeResult> => {
  const nftToSell = await requestNftExchangeSingle(opts);

  if (!nftToSell) {
    const requestUuid = v4();

    await addNftExchangeRequestToQueue({requestUuid, ...opts});

    return {result: 'queued', requestUuid};
  }

  const bankDetails = await userBankDetailsCollection.find({userId: nftToSell.owner.toHexString()})
    .toArray();

  return {
    result: 'found',
    userId: nftToSell.owner.toHexString(),
    bankDetails,
  };
};

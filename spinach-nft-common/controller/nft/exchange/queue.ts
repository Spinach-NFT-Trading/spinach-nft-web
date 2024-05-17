import {nftExchangeQueueCollection} from '@spinach/common/controller/collections/nft';
import {NftExchangeRequestCommonOpts} from '@spinach/common/controller/nft/exchange/type';


export const queueNftExchangeRequest = async ({
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

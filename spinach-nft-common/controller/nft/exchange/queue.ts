import {nftExchangeQueueCollection} from '@spinach/common/controller/collections/nft';


type AddNftExchangeRequestToQueueOpts = {
  requestUuid: string,
  token: string,
  amount: number,
};

export const addNftExchangeRequestToQueue = async ({
  requestUuid,
  token,
  amount,
}: AddNftExchangeRequestToQueueOpts) => {
  await nftExchangeQueueCollection.insertOne({
    requestUuid,
    token,
    amount,
  });
};

import {getNftExchangeTokenMapByIds} from '@spinach/common/controller/actors/nft';
import {nftExchangeQueueCollection} from '@spinach/common/controller/collections/nft';
import {requestNftExchangeSingle} from '@spinach/common/controller/nft/exchange/single/main';


export const checkQueuedNftExchangeRequests = async () => {
  console.log('Checking queued NFT exchange requests');

  const queuedList = await nftExchangeQueueCollection.find().toArray();
  const tokenMap = await getNftExchangeTokenMapByIds({
    tokenIds: queuedList.map(({token}) => token),
  });

  for (const queued of queuedList) {
    const {requestUuid, token} = queued;
    const tokenModel = tokenMap[token];
    if (tokenModel == null) {
      console.warn(`Queued exchange request ${queued.requestUuid} has an invalid token source: ${token}`);
      continue;
    }

    console.log(`Checking queued request ${queued.requestUuid}`);
    await requestNftExchangeSingle({
      requestBody: queued,
      requestUuid,
      tokenModel,
    });
  }
};

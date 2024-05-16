import {nftExchangeTokenCollection} from '@spinach/common/controller/collections/nft';
import {sessionPollCollection} from '@spinach/common/controller/collections/session';
import {userNftPositionCollection} from '@spinach/common/controller/collections/user';
import {NftExchangeRequest} from '@spinach/common/types/api/nft/exchange';
import {UserNftPositionModel} from '@spinach/common/types/data/user/nftPosition';

import {nftExchangeRequestUserOnlineWindowMs} from '@spinach/server/const/request';


type RequestNftExchangeSingleOpts = NftExchangeRequest;

export const requestNftExchangeSingle = async ({
  token,
  amount,
}: RequestNftExchangeSingleOpts): Promise<UserNftPositionModel | null> => {
  const requestToken = await nftExchangeTokenCollection.findOne({token});
  if (!requestToken) {
    throw new Error(`Invalid NFT exchange token: ${token}`);
  }

  const userIdsOnline = (await sessionPollCollection
    .find({lastCheck: {$gt: new Date(Date.now() - nftExchangeRequestUserOnlineWindowMs)}})
    .toArray())
    .map(({userId}) => userId);
  return await userNftPositionCollection.findOne(
    {price: {$gt: amount}, owner: {$in: userIdsOnline}},
    // Finds the closest to amount, then start from the oldest
    {sort: [['price', -1], ['_id', 1]]},
  );
};

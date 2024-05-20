import {nftExchangeRequestUserOnlineWindowMs} from '@spinach/common/const/nft';
import {sessionPollCollection} from '@spinach/common/controller/collections/session';
import {userNftPositionCollection} from '@spinach/common/controller/collections/user';
import {getNftExchangeTargetExclusion} from '@spinach/common/controller/nft/exchange/single/exclusion';
import {UserNftPositionModel} from '@spinach/common/types/data/user/nftPosition';


type RequestNftExchangeGetNftSoldOpts = {
  amount: number,
};

export const requestNftExchangeGetNftSold = async ({
  amount,
}: RequestNftExchangeGetNftSoldOpts): Promise<UserNftPositionModel | null> => {
  const userIdsOnline = (await sessionPollCollection
    .find({lastCheck: {$gt: new Date(Date.now() - nftExchangeRequestUserOnlineWindowMs)}})
    .toArray())
    .map(({userId}) => userId);
  // These are excluded because they are already matched
  const nftExcluded = await getNftExchangeTargetExclusion();

  return await userNftPositionCollection.findOne(
    {price: {$gte: amount}, owner: {$in: userIdsOnline}, nftId: {$nin: nftExcluded}},
    // Finds the closest to amount, then start from the oldest
    {sort: [['price', -1], ['_id', 1]]},
  );
};

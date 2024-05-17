import {nftExchangeRequestUserOnlineWindowMs} from '@spinach/common/const/nft';
import {nftExchangeMatchedCollection, nftExchangeTokenCollection} from '@spinach/common/controller/collections/nft';
import {sessionPollCollection} from '@spinach/common/controller/collections/session';
import {userBankDetailsCollection, userNftPositionCollection} from '@spinach/common/controller/collections/user';
import {getNftExchangeTargetExclusion} from '@spinach/common/controller/nft/exchange/single/exclusion';
import {RequestNftExchangeResult} from '@spinach/common/controller/nft/exchange/single/type';
import {NftExchangeRequestCommonOpts} from '@spinach/common/controller/nft/exchange/type';
import {BankDetails} from '@spinach/common/types/data/user/bank';


export const requestNftExchangeSingle = async ({
  token,
  amount,
  requestUuid,
}: NftExchangeRequestCommonOpts): Promise<RequestNftExchangeResult | null> => {
  const requestToken = await nftExchangeTokenCollection.findOne({token});
  if (!requestToken) {
    throw new Error(`Invalid NFT exchange token: ${token}`);
  }

  const userIdsOnline = (await sessionPollCollection
    .find({lastCheck: {$gt: new Date(Date.now() - nftExchangeRequestUserOnlineWindowMs)}})
    .toArray())
    .map(({userId}) => userId);
  // These are excluded because they are already matched
  const nftExcluded = await getNftExchangeTargetExclusion();

  const nftSold = await userNftPositionCollection.findOne(
    {price: {$gt: amount}, owner: {$in: userIdsOnline}, nftId: {$nin: nftExcluded}},
    // Finds the closest to amount, then start from the oldest
    {sort: [['price', -1], ['_id', 1]]},
  );

  if (!nftSold) {
    return null;
  }

  const bankDetails: BankDetails[] = await userBankDetailsCollection.find({
    userId: nftSold.owner.toHexString(),
    status: 'verified',
  })
    .map(({code, account, status, uuid}) => ({
      // Return whatever needed only
      code,
      account,
      status,
      uuid,
    }))
    .toArray();

  const refunded = nftSold.price - amount;

  await nftExchangeMatchedCollection.insertOne({
    requestUuid,
    token,
    amount: {
      requested: amount,
      matched: nftSold.price,
      refunded,
    },
    nftId: nftSold.nftId,
    bankDetailsUuid: bankDetails.map(({uuid}) => uuid),
  });

  return {nftSold, bankDetails};
};

import {nftExchangeMatchedCollection, nftExchangeTokenCollection} from '@spinach/common/controller/collections/nft';
import {userBankDetailsCollection} from '@spinach/common/controller/collections/user';
import {requestNftExchangeGetNftSold} from '@spinach/common/controller/nft/exchange/single/getNftSold';
import {requestNftExchangeSingleSendWebhook} from '@spinach/common/controller/nft/exchange/single/sendWebhook';
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

  const nftSold = await requestNftExchangeGetNftSold({amount});
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

  await requestNftExchangeSingleSendWebhook({
    requestToken,
    payload: {requestUuid, amount, bankDetails},
  });

  return {nftSold, bankDetails};
};

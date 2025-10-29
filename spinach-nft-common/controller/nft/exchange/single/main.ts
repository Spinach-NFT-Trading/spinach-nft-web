import {
  nftExchangeMatchedCollection,
  nftExchangeQueueCollection,
} from '@spinach/common/controller/collections/nft';
import {userBankDetailsCollection} from '@spinach/common/controller/collections/user';
import {Mongo} from '@spinach/common/controller/const';
import {requestNftExchangeGetNftSold} from '@spinach/common/controller/nft/exchange/single/getNftSold';
import {requestNftExchangeSingleSendWebhook} from '@spinach/common/controller/nft/exchange/single/sendWebhook';
import {RequestNftExchangeResult} from '@spinach/common/controller/nft/exchange/single/type';
import {NftExchangeRequestCommonOpts} from '@spinach/common/controller/nft/exchange/type';
import {BankDetails} from '@spinach/common/types/data/user/bank';


export const requestNftExchangeSingle = async ({
  requestBody,
  requestUuid,
  tokenModel,
}: NftExchangeRequestCommonOpts): Promise<RequestNftExchangeResult | null> => {
  const {amount} = requestBody;
  const {token} = tokenModel;

  const nftSold = await requestNftExchangeGetNftSold({amount});
  if (!nftSold) {
    return null;
  }

  const bankDetails: BankDetails[] = await userBankDetailsCollection.find({
    userId: nftSold.owner.toHexString(),
    status: 'verified',
  })
    .map(({code, account, status, uuid, imageUploadId}): BankDetails => ({
      // Return whatever needed only
      code,
      account,
      status,
      uuid,
      imageUploadId,
    }))
    .toArray();

  const refunded = nftSold.price - amount;

  console.log('NFT exchange request matched');
  console.log(`> Request source: ${requestUuid}`);
  console.log(`> Token: ${token}`);
  console.log(`> Amount: [Requested] ${amount} [Matched] ${nftSold.price} [Refunded] ${refunded}`);

  await Mongo.withSession(async (session) => {
    await session.withTransaction(async () => {
      await nftExchangeMatchedCollection.insertOne(
        {
          requestUuid,
          token,
          amount: {
            requested: amount,
            matched: nftSold.price,
            refunded,
          },
          nftId: nftSold.nftId,
          bankDetailsUuid: bankDetails.map(({uuid}) => uuid),
          completedAt: null,
        },
        {session},
      );
      await nftExchangeQueueCollection.deleteOne({token});

      await requestNftExchangeSingleSendWebhook({
        requestToken: tokenModel,
        payload: {requestUuid, amount, bankDetails},
      });
    });
  });

  return {nftSold, bankDetails};
};

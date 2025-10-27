import {listNft} from '@spinach/common/controller/nft/list/mint';
import {NftSellRequest, NftSellResult} from '@spinach/common/types/api/nft/sell';


type SellLimitedNftOpts = {
  request: NftSellRequest,
  requestedToken: string,
};

export const sellLimitedNft = async ({
  request,
  requestedToken,
}: SellLimitedNftOpts): Promise<NftSellResult> => {
  const {bankAccount, amount} = request;

  console.log(`New Limited NFT creation requested for bank account ${bankAccount} with amount ${amount}`);

  const nftInfo = await listNft({
    price: amount,
    isLimited: true,
    bankAccount,
    requestedToken,
  });

  return {
    limitedNftId: nftInfo.insertedId.toHexString(),
  };
};


import {toNonNullishArray} from '@spinach/common/utils/array';
import {ObjectId} from 'mongodb';

import {getNftLastTradedPriceMap} from '@spinach/next/controller/nft/utils';
import {NftInfoMap} from '@spinach/next/types/mongo/nft';
import {NftListingData} from '@spinach/next/types/nft';


export const getNftListingData = async (nftIds: ObjectId[], nftInfoMap: NftInfoMap): Promise<NftListingData[]> => {
  const nftPriceMap = await getNftLastTradedPriceMap(nftIds);

  return toNonNullishArray(nftIds.map((nftId): NftListingData | null => {
    const nftInfo = nftInfoMap[nftId.toHexString()];
    if (nftInfo == null) {
      return null;
    }

    return {
      ...nftInfo,
      id: nftId.toHexString(),
      price: nftPriceMap[nftId.toHexString()],
    };
  }));
};

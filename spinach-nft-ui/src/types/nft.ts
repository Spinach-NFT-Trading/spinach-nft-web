import {NftInfoModel} from '@spinach/common/types/data/nft';


export type NftListingData = NftInfoModel & {
  id: string,
  price: number,
};

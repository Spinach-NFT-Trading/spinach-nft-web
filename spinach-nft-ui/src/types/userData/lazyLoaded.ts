import {NftListingData} from '@spinach/next/types/nft';
import {UserDataLoadingOpts} from '@spinach/next/types/userData/load';


export type UserLazyLoadedDataType = UserDataLoadingOpts['type'];

export type UserLazyLoadedContent = {
  nftPosition: NftListingData[],
};

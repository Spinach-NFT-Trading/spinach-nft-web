import {NftInfoModel} from '@spinach/common/types/data/nft';

import {UserDataLoadingOpts} from '@spinach/next/types/userData/load';


export type UserLazyLoadedDataType = UserDataLoadingOpts['type'];

export type UserLazyLoadedContent = {
  nftPosition: NftInfoModel[],
};

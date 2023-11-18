import {BinaryData} from '@spinach/common/types/common/binary';
import {UserInfo} from '@spinach/common/types/common/user';

import {NftListingData} from '@spinach/next/types/nft';
import {UserDataLoadingOpts} from '@spinach/next/types/userData/load';


export type UserLazyLoadedDataType = UserDataLoadingOpts['type'];

export type UserLazyLoadedContent = {
  nftPosition: NftListingData[],
  userInfo: UserInfo,
  adminUnverifiedAccounts: UserInfo[],
  adminImageOfId: BinaryData | null,
};

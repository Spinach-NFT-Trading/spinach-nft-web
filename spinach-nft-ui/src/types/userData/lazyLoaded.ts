import {BinaryData} from '@spinach/common/types/common/binary';
import {UserInfo} from '@spinach/common/types/common/user';
import {UserBankDetails} from '@spinach/common/types/data/user/bank';

import {NftListingData} from '@spinach/next/types/nft';
import {UserDataLoadingOpts} from '@spinach/next/types/userData/load';


export type UserLazyLoadedDataType = UserDataLoadingOpts['type'];

export type UserLazyLoadedContent = {
  nftPosition: NftListingData[],
  userInfo: UserInfo,
  userBankDetails: UserBankDetails[],
  adminUnverifiedAccounts: UserInfo[],
  adminImageOfId: BinaryData | null,
};

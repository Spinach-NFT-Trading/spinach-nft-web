import {BinaryData} from '@spinach/common/types/common/binary';
import {UserInfo, UserDataMap} from '@spinach/common/types/common/user';
import {UserBankDetails} from '@spinach/common/types/data/user/bank';

import {NftListingData} from '@spinach/next/types/nft';


export type ResponseOfUnverifiedBankDetails = {
  userDataMap: UserDataMap,
  details: UserBankDetails[],
};

export type UserLazyLoadedContent = {
  nftPosition: NftListingData[],
  userInfo: UserInfo,
  userBankDetails: UserBankDetails[],
  adminUnverifiedAccounts: UserInfo[],
  adminUnverifiedBankDetails: ResponseOfUnverifiedBankDetails,
  adminImageOfId: BinaryData | null,
  adminImageOfBank: BinaryData | null,
};

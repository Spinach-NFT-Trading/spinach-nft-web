import {BinaryData} from '@spinach/common/types/common/binary';
import {UserDataMap, UserInfo} from '@spinach/common/types/common/user';
import {BankDetails, UserBankDetails} from '@spinach/common/types/data/user/bank';

import {NftListingData} from '@spinach/next/types/nft';
import {UserDataLoadingType} from '@spinach/next/types/userData/load';


export type ResponseOfUnverifiedBankDetails = {
  userDataMap: UserDataMap,
  details: UserBankDetails[],
};

export type UserLazyLoadedContent = {
  // Keys here should match `UserDataLoadingOpts.type`
  nftPosition: NftListingData[],
  verifiedBankDetails: BankDetails[],
  adminUnverifiedAccounts: UserInfo[],
  adminUnverifiedBankDetails: ResponseOfUnverifiedBankDetails,
  adminImageOfId: BinaryData | null,
  adminImageOfBankDetails: BinaryData | null,
};

// For checking if `UserLazyLoadedContent` implements every key of `UserDataLoadingOpts.type`
// noinspection JSUnusedLocalSymbols
type _ = UserLazyLoadedContent[UserDataLoadingType];

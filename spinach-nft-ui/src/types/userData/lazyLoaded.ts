import {BinaryData} from '@spinach/common/types/common/binary';
import {UserDataMap, UserInfo} from '@spinach/common/types/common/user';
import {GoldPurchaseTwBankRecordClient} from '@spinach/common/types/data/gold/purchase';
import {GoldWalletClientMap} from '@spinach/common/types/data/gold/wallet';
import {BankDetails, BankDetailsMap, UserBankDetails} from '@spinach/common/types/data/user/bank';

import {UserBalanceSummary} from '@spinach/next/types/mongo/balance';
import {NftListingData} from '@spinach/next/types/nft';
import {UserDataLoadingType} from '@spinach/next/types/userData/load';


export type ResponseOfUnverifiedBankDetails = {
  userDataMap: UserDataMap,
  details: UserBankDetails[],
};

export type ResponseOfUnverifiedGoldTxn = {
  userDataMap: UserDataMap,
  bankDetailsMap: BankDetailsMap,
  walletMap: GoldWalletClientMap,
  unverified: {
    twBank: GoldPurchaseTwBankRecordClient[],
  },
};

export type ResponseAdminMemberList = {
  info: UserInfo[],
  balanceSummaryMap: {[userId in string]?: UserBalanceSummary},
};

export type UserLazyLoadedContent = {
  // Keys here should match `UserDataLoadingOpts.type`
  nftPosition: NftListingData[],
  verifiedBankDetails: BankDetails[],
  adminMemberList: ResponseAdminMemberList,
  adminUnverifiedAccounts: UserInfo[],
  adminUnverifiedBankDetails: ResponseOfUnverifiedBankDetails,
  adminUnverifiedGoldTxn: ResponseOfUnverifiedGoldTxn,
  adminImageOfId: BinaryData | null,
  adminImageOfBankDetails: BinaryData | null,
  adminImageOfGoldTxnTwBank: BinaryData | null,
};

// For checking if `UserLazyLoadedContent` implements every key of `UserDataLoadingOpts.type`
// noinspection JSUnusedLocalSymbols
type _ = UserLazyLoadedContent[UserDataLoadingType];

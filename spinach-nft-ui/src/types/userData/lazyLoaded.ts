import {BinaryData} from '@spinach/common/types/common/binary';
import {UserDataMap} from '@spinach/common/types/common/user/data';
import {UserInfo, UserInfoListByAgent} from '@spinach/common/types/common/user/info';
import {GoldPurchaseTwBankRecordClient} from '@spinach/common/types/data/gold/purchase';
import {GoldWalletClientMap} from '@spinach/common/types/data/gold/wallet';
import {BankDetails, BankDetailsMap, UserBankDetails} from '@spinach/common/types/data/user/bank';

import {
  UserBalanceActivityMap,
  UserBalanceDailySummary,
  UserBalanceHistoryModelClient,
} from '@spinach/next/types/mongo/balance';
import {NftTxnModelClient} from '@spinach/next/types/mongo/nft';
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

export type ResponseOfAdminMemberList = {
  agent: UserInfo | null,
  members: UserInfo[],
  balanceActivityMap: UserBalanceActivityMap,
};

export type ResponseOfAdminAgentList = {
  agentMemberList: UserInfoListByAgent[],
  agentInfo: UserDataMap,
  balanceActivityMap: UserBalanceActivityMap,
};

export type ResponseOfAdminNftTxn = {
  userDataMap: UserDataMap,
  nftTxn: NftTxnModelClient[],
};

export type UserLazyLoadedContent = {
  // Keys here should match `UserDataLoadingOpts.type`
  nftPosition: NftListingData[],
  bankDetails: BankDetails[],
  verifiedBankDetails: BankDetails[],
  adminAgentList: ResponseOfAdminAgentList,
  adminMemberList: ResponseOfAdminMemberList,
  adminMemberNftTxn: ResponseOfAdminNftTxn,
  adminMemberBalanceDaily: UserBalanceDailySummary,
  adminMemberBalanceDetails: UserBalanceHistoryModelClient[],
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

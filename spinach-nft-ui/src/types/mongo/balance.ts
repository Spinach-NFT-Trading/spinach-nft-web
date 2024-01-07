import {UserBalanceHistoryTxnType} from '@spinach/common/types/data/user/balance';


export type UserBalanceSummary = {
  currentBalance: number,
  byTxnType: {[type in UserBalanceHistoryTxnType]?: number},
};

export type UserBalanceSummaryMap = {[userId in string]?: UserBalanceSummary};

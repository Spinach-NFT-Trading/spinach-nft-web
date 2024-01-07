import {UserBalanceHistoryModel, UserBalanceHistoryTxnType} from '@spinach/common/types/data/user/balance';


export type UserBalanceSummary = {
  currentBalance: number,
  byTxnType: {[type in UserBalanceHistoryTxnType]?: number},
};

export type UserBalanceSummaryMap = {[userId in string]?: UserBalanceSummary};

export type UserBalanceHistoryModelClient = Pick<
  UserBalanceHistoryModel,
  'current' | 'diff' | 'type'
> & {
  id: string,
};

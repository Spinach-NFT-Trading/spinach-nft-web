import {IsoDateString} from '@spinach/common/types/common/date';
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
  epochMs: number,
  id: string,
};

export type UserBalanceDailySummaryOfDay = {
  date: IsoDateString,
  endBalance: number,
  total: {[txnType in UserBalanceHistoryTxnType]?: number},
};

export type UserBalanceDailySummary = {
  startingBalance: number,
  dataByDate: {[date in IsoDateString]?: UserBalanceDailySummaryOfDay}
};

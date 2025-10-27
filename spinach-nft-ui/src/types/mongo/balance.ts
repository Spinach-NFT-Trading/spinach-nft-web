import {IsoDateString} from '@spinach/common/types/common/date';
import {UserBalanceHistoryModel, UserBalanceHistoryTxnType} from '@spinach/common/types/data/user/balance';


export type UserBalanceActivityByTxnType = {[type in UserBalanceHistoryTxnType]?: number};

export type UserBalanceActivity = {
  currentBalance: number,
  byTxnType: UserBalanceActivityByTxnType,
};

export type UserBalanceActivityMap = {[userId in string]?: UserBalanceActivity};

export type UserBalanceHistoryModelClient = Pick<
  UserBalanceHistoryModel,
  'current' | 'diff' | 'type'
> & {
  epochMs: number,
  id: string,
};

export type UserBalanceDailySummaryOfDay = {
  dateString: IsoDateString,
  endBalance: number,
  total: {[txnType in UserBalanceHistoryTxnType]?: number},
};

export type UserBalanceDailySummary = {
  startingBalance: number,
  dataByDate: {[date in IsoDateString]?: UserBalanceDailySummaryOfDay}
};

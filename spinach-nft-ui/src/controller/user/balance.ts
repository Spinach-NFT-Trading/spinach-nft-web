import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {UserBalanceHistoryTxnType} from '@spinach/common/types/data/user/balance';
import {ObjectId} from 'mongodb';

import {UserBalanceSummary, UserBalanceSummaryMap} from '@spinach/next/types/mongo/balance';


type UserBalanceSummaryAggregated = {
  _id: ObjectId,
  byTxnType: {
    type: UserBalanceHistoryTxnType,
    total: number,
  }[],
  currentBalance: number,
};

type GetUserBalanceSummaryOpts = {
  userIdsToCheck: ObjectId[],
};

export const getUserBalanceSummaryMap = async ({
  userIdsToCheck,
}: GetUserBalanceSummaryOpts): Promise<UserBalanceSummaryMap> => {
  const aggregated = userBalanceCollection.aggregate<UserBalanceSummaryAggregated>([
    {
      $match: {
        userId: {$in: userIdsToCheck},
      },
    },
    {
      $sort: {
        userId: 1,
        type: 1,
      },
    },
    {
      $group: {
        _id: {
          userId: '$userId',
          type: '$type',
        },
        txn: {$push: '$$ROOT'},
        currentBalance: {$last: '$current'},
      },
    },
    {
      $group: {
        _id: '$_id.userId',
        byTxnType: {
          $push: {
            type: '$_id.type',
            total: {
              $sum: '$txn.diff',
            },
          },
        },
        currentBalance: {$first: '$currentBalance'},
      },
    },
  ]);

  return Object.fromEntries(await aggregated.map(({_id, byTxnType, currentBalance}) => [
    _id.toHexString(),
    {
      byTxnType: Object.fromEntries(byTxnType.map(({type, total}) => [type, total])),
      currentBalance,
    } satisfies UserBalanceSummary,
  ]).toArray());
};

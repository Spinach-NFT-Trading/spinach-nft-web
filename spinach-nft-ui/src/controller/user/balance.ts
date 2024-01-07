import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {UserBalanceHistoryTxnType} from '@spinach/common/types/data/user/balance';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {throwIfNotAdminOrAgent} from '@spinach/next/controller/utils';
import {
  UserBalanceHistoryModelClient,
  UserBalanceSummary,
  UserBalanceSummaryMap,
} from '@spinach/next/types/mongo/balance';


type UserBalanceSummaryAggregated = {
  _id: ObjectId,
  byTxnType: {
    type: UserBalanceHistoryTxnType,
    total: number,
  }[],
  currentBalance: number,
};

type GetUserBalanceSummaryOpts = ControllerRequireUserIdOpts & {
  userIdsToCheck: ObjectId[],
};

export const getUserBalanceSummaryMap = async ({
  executorUserId,
  userIdsToCheck,
}: GetUserBalanceSummaryOpts): Promise<UserBalanceSummaryMap> => {
  await throwIfNotAdminOrAgent(executorUserId);

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

type GetUserBalanceHistoryOpts = ControllerRequireUserIdOpts & {
  userId: string,
};

export const getUserBalanceHistory = async ({
  executorUserId,
  userId,
}: GetUserBalanceHistoryOpts): Promise<UserBalanceHistoryModelClient[]> => {
  await throwIfNotAdminOrAgent(executorUserId);

  return userBalanceCollection.find({userId: new ObjectId(userId)})
    .sort({_id: 1})
    .map(({
      _id,
      type,
      current,
      diff,
    }): UserBalanceHistoryModelClient => ({
      id: _id.toHexString(),
      epochMs: _id.getTimestamp().getTime(),
      type,
      current,
      diff,
    }))
    .toArray();
};

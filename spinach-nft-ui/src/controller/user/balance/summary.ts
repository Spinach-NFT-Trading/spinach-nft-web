import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {throwIfNotElevated} from '@spinach/common/controller/user/permission';
import {UserBalanceHistoryTxnType} from '@spinach/common/types/data/user/balance';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {toIdRangeFromLookBackRequest} from '@spinach/next/controller/user/utils';
import {UserBalanceActivity, UserBalanceActivityMap} from '@spinach/next/types/mongo/balance';
import {DataLookBackRequest} from '@spinach/next/types/userData/load';


type UserBalanceActivityAggregated = {
  _id: ObjectId,
  byTxnType: {
    type: UserBalanceHistoryTxnType,
    total: number,
  }[],
  currentBalance: number,
};

type GetUserBalanceActivityOpts = ControllerRequireUserIdOpts & DataLookBackRequest & {
  userIdsToCheck: ObjectId[],
};

export const getUserBalanceActivityMap = async ({
  executorUserId,
  userIdsToCheck,
  ...request
}: GetUserBalanceActivityOpts): Promise<UserBalanceActivityMap> => {
  await throwIfNotElevated(executorUserId);

  const aggregated = userBalanceCollection.aggregate<UserBalanceActivityAggregated>([
    {
      $match: {
        userId: {$in: userIdsToCheck},
        ...toIdRangeFromLookBackRequest(request),
      },
    },
    {$sort: {_id: -1}},
    {
      $group: {
        _id: '$userId',
        txn: {$push: '$$ROOT'},
        currentBalance: {$first: '$current'},
      },
    },
    {$unwind: {path: '$txn'}},
    {
      $group: {
        _id: {userId: '$_id', type: '$txn.type'},
        txn: {$push: '$txn'},
        currentBalance: {$first: '$currentBalance'},
      },
    },
    {
      $group: {
        _id: '$_id.userId',
        byTxnType: {
          $push: {
            type: '$_id.type',
            total: {$sum: '$txn.diff'},
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
    } satisfies UserBalanceActivity,
  ]).toArray());
};

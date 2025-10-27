import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {throwIfNotElevated} from '@spinach/common/controller/user/permission';
import {UserBalanceHistoryTxnType} from '@spinach/common/types/data/user/balance';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {toIdRangeFromLookBackRequest} from '@spinach/next/controller/user/utils';
import {
  UserBalanceActivity,
  UserBalanceActivityByTxnType,
  UserBalanceActivityMap,
} from '@spinach/next/types/mongo/balance';
import {DataLookBackRequest} from '@spinach/next/types/userData/load';


type UserBalanceActivityAggregatedGroupByType = {
  _id: ObjectId,
  byTxnType: {
    type: UserBalanceHistoryTxnType,
    total: number,
  }[],
};

type UserBalanceActivityAggregatedCurrentBalance = {
  _id: ObjectId,
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

  const currentBalanceAggregated = await userBalanceCollection
    .aggregate<UserBalanceActivityAggregatedCurrentBalance>([
      {
        $match: {
          userId: {$in: userIdsToCheck},
        },
      },
      {$sort: {_id: -1}},
      {
        $group: {
          _id: '$userId',
          currentBalance: {$first: '$current'},
        },
      },
    ])
    .toArray();

  const currentBalanceMap = new Map(currentBalanceAggregated.map(({_id, currentBalance}) => [
    _id.toHexString(),
    currentBalance,
  ]));

  const aggregated = await userBalanceCollection.aggregate<UserBalanceActivityAggregatedGroupByType>([
    {
      $match: {
        userId: {$in: userIdsToCheck},
        ...toIdRangeFromLookBackRequest(request),
      },
    },
    {
      $group: {
        _id: {userId: '$userId', type: '$type'},
        total: {$sum: '$diff'},
      },
    },
    {
      $group: {
        _id: '$_id.userId',
        byTxnType: {
          $push: {
            type: '$_id.type',
            total: '$total',
          },
        },
      },
    },
  ]).toArray();

  const activityMap = new Map(aggregated.map(({_id, byTxnType}) => [
    _id.toHexString(),
    Object.fromEntries(byTxnType.map(({type, total}) => [type, total])) as UserBalanceActivityByTxnType,
  ]));

  // Ensure all userIdsToCheck are included in the result
  return Object.fromEntries(userIdsToCheck.map((userId) => {
    const userIdStr = userId.toHexString();

    return [
      userIdStr,
      {
        byTxnType: activityMap.get(userIdStr) ?? {},
        currentBalance: currentBalanceMap.get(userIdStr) ?? 0,
      } satisfies UserBalanceActivity,
    ];
  }));
};

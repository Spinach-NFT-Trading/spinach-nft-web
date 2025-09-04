import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {throwIfNotPrivileged} from '@spinach/common/controller/user/permission';
import {IsoDateString} from '@spinach/common/types/common/date';
import {UserBalanceHistoryTxnType} from '@spinach/common/types/data/user/balance';
import {ObjectId} from 'mongodb';

import {getUserBalanceAtDay} from '@spinach/next/controller/user/balance/atDay';
import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {toIdRangeFromLookBackRequest} from '@spinach/next/controller/user/utils';
import {UserBalanceDailySummary} from '@spinach/next/types/mongo/balance';
import {DataLookBackRequestOnUser} from '@spinach/next/types/userData/load';


type UserBalanceDailySummaryAggregated = {
  dateString: IsoDateString,
  endBalance: number,
  total: {[txnType in UserBalanceHistoryTxnType]?: number},
};

type GetUserBalanceDailySummaryOpts = ControllerRequireUserIdOpts & DataLookBackRequestOnUser;

export const getUserBalanceDailySummary = async ({
  executorUserId,
  ...request
}: GetUserBalanceDailySummaryOpts): Promise<UserBalanceDailySummary> => {
  const userId = new ObjectId(request.userId);
  await throwIfNotPrivileged(executorUserId);

  const idRange = toIdRangeFromLookBackRequest(request);
  const result = userBalanceCollection.aggregate<UserBalanceDailySummaryAggregated>([
    {$match: {userId, ...idRange}},
    {
      $group: {
        _id: {
          date: {$dateToString: {date: '$_id', timezone: request.ianaTimezone, format: '%Y-%m-%d'}},
          type: '$type',
        },
        txn: {$push: '$$ROOT'},
        endBalance: {$last: '$$ROOT.current'},
      },
    },
    {
      $group: {
        _id: '$_id.date',
        total: {
          $push: {
            k: '$_id.type',
            v: {$sum: '$txn.diff'},
          },
        },
        endBalance: {$last: '$endBalance'},
      },
    },
    {
      $project: {
        _id: false,
        dateString: '$_id',
        endBalance: '$endBalance',
        total: {$arrayToObject: '$total'},
      },
    },
  ]);

  return {
    startingBalance: await getUserBalanceAtDay({
      executorUserId,
      userId,
      latestId: idRange._id.$gte,
    }),
    dataByDate: Object.fromEntries((await result.toArray())
      .map(({dateString, endBalance, total}) => [
        dateString,
        {dateString, endBalance, total},
      ])),
  };
};

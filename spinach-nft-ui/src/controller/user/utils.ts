import {ObjectId} from 'mongodb';

import {DataLookBackRequest} from '@spinach/next/types/userData/load';


export const toIdRangeFromLookBackRequest = ({
  startEpochMs,
  endEpochMs,
}: DataLookBackRequest) => {
  return {
    _id: {
      $gte: ObjectId.createFromTime(startEpochMs / 1000),
      $lt: ObjectId.createFromTime(endEpochMs / 1000),
    },
  };
};

import {endOfDay} from 'date-fns/endOfDay';
import {startOfDay} from 'date-fns/startOfDay';

import {DataLookBackRequest} from '@spinach/next/types/userData/load';
import {getIanaTimezone} from '@spinach/next/utils/date';


export const generateDataLookBackRequestOfSameDay = (date: Date = new Date()): DataLookBackRequest => {
  return {
    startEpochMs: startOfDay(date).getTime(),
    endEpochMs: endOfDay(date).getTime(),
    ianaTimezone: getIanaTimezone(),
  };
};

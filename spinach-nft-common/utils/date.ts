import {format} from 'date-fns/format';

import {DateDelta, IsoDateString} from '@spinach/common/types/common/date';


export const toIsoLocalDateStringFromEpochMs = (epochMs: number): IsoDateString => {
  if (isNaN(epochMs)) {
    return toIsoLocalDateString(new Date(0));
  }

  return toIsoLocalDateString(new Date(epochMs));
};

export const toIsoLocalDateString = (date: Date): IsoDateString => format(date, 'yyyy-MM-dd') as IsoDateString;

type GetDateAfterDeltaOpts = {
  date: Date,
  delta: Partial<DateDelta>,
};

export const getDateAfterDelta = ({date, delta}: GetDateAfterDeltaOpts) => {
  const dateReturn = new Date(date);

  if (delta.day) {
    dateReturn.setDate(dateReturn.getDate() + delta.day);
  }

  return dateReturn;
};

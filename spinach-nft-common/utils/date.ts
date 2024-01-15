import {format} from 'date-fns/format';

import {DateDelta, IsoDateString} from '@spinach/common/types/common/date';


export const toIsoUtcDateString = (date: Date): IsoDateString => date.toISOString().slice(0, 10) as IsoDateString;

export const toIsoLocalDateString = (date: Date): IsoDateString => format(date, 'yyyy-MM-dd') as IsoDateString;

type GetDateAfterDeltaOpts = {
  date: Date,
  delta: Partial<DateDelta>,
};

export const getDateAfterDelta = ({date, delta}: GetDateAfterDeltaOpts) => {
  const dateReturn = new Date(date);

  if (!!delta.day) {
    dateReturn.setDate(dateReturn.getDate() + delta.day);
  }

  return dateReturn;
};

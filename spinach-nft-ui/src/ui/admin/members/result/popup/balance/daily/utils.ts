import {toIsoLocalDateString} from '@spinach/common/utils/date';

import {UserBalanceDailySummary, UserBalanceDailySummaryOfDay} from '@spinach/next/types/mongo/balance';
import {DataLookBackRequestOnUser} from '@spinach/next/types/userData/load';


type GetFlattenedDailySummaryOpts = {
  request: DataLookBackRequestOnUser,
  data: UserBalanceDailySummary,
};

export const getFlattenedDailySummary = ({
  request,
  data,
}: GetFlattenedDailySummaryOpts): UserBalanceDailySummaryOfDay[] => {
  const {startDate, endDate} = request;
  const {dataByDate, startingBalance} = data;

  const currentDate = new Date(startDate);
  let currentBalance = startingBalance;
  const terminal = new Date(endDate);

  const ret: UserBalanceDailySummaryOfDay[] = [];

  while (currentDate <= terminal) {
    const currentDateString = toIsoLocalDateString(currentDate);
    let dataAtCurrent = dataByDate[currentDateString];

    if (!dataAtCurrent) {
      dataAtCurrent = {
        date: currentDateString,
        endBalance: currentBalance,
        total: {},
      };
    }

    ret.push({...dataAtCurrent});

    currentBalance = dataAtCurrent.endBalance;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return ret;
};

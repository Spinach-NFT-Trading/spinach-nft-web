import React from 'react';

import {Nullable} from '@spinach/common/types/common/typing';
import {clsx} from 'clsx';

import {useCountUp} from '@spinach/next/hooks/time/countUp';
import {padTimeUnit} from '@spinach/next/utils/number/pad';


type Props = {
  date: Date,
  getStyleClass?: (totalSeconds: number) => Nullable<string>,
};

export const CountUp = ({date, getStyleClass}: Props) => {
  const {totalSeconds, hours, minutes, seconds} = useCountUp(date);

  return (
    <span className={clsx(getStyleClass && getStyleClass(totalSeconds))}>
      {`${padTimeUnit(hours)}:${padTimeUnit(minutes)}:${padTimeUnit(seconds)}`}
    </span>
  );
};

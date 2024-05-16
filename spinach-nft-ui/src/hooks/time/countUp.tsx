import React from 'react';


import {TimeDuration} from '@spinach/next/types/time';
import {getTimeDuration} from '@spinach/next/utils/time/duration';


export const useCountUp = (date: Date): TimeDuration => {
  const [
    duration,
    setDuration,
  ] = React.useState<TimeDuration>(getTimeDuration({start: date, end: new Date()}));

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setDuration(getTimeDuration({start: date, end: new Date()})),
      1000,
    );

    return () => clearInterval(intervalId);
  }, []);

  return duration;
};

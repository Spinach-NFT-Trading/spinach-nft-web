import {TimeDuration} from '@spinach/next/types/time';


type GetTimeDurationOpts = {
  start: Date,
  end: Date,
};

export const getTimeDuration = ({start, end}: GetTimeDurationOpts): TimeDuration => {
  const totalSeconds = (end.getTime() - start.getTime()) / 1000;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = Math.floor(totalSeconds % 3600 % 60);

  return {totalSeconds, hours, minutes, seconds};
};

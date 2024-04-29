'use client';
import React from 'react';

import {sessionPollIntervalMs} from '@spinach/next/hooks/session/poll/const';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';


export const useSessionPoll = () => {
  const {act} = useUserDataActor();

  React.useEffect(() => {
    if (!act) {
      return;
    }

    const intervalId = setInterval(() => {
      void act({
        action: 'request',
        options: {type: 'session.poll'},
      });
    }, sessionPollIntervalMs);

    return () => clearInterval(intervalId);
  }, [act]);
};

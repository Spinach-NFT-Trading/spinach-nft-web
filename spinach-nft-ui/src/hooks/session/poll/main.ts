'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {recordSessionPoll} from '@spinach/next/controller/session/poll';
import {sessionPollIntervalMs} from '@spinach/next/hooks/session/poll/const';


export const useSessionPoll = () => {
  const {data} = useSession();

  React.useEffect(() => {
    // Somehow using `useSession()` doesn't work
    // This doesn't require any security measure (for now), therefore using server action
    if (!data) {
      return;
    }

    const sendPollSignal = async () => {
      const executorUserId = data.user.id;
      if (!executorUserId) {
        return;
      }

      await recordSessionPoll({executorUserId});
    };

    void sendPollSignal();

    const intervalId = setInterval(sendPollSignal, sessionPollIntervalMs);

    return () => clearInterval(intervalId);
  }, [data]);
};

import React from 'react';

import {getDateAfterDelta} from '@spinach/common/utils/date';
import {endOfDay} from 'date-fns/endOfDay';
import {startOfDay} from 'date-fns/startOfDay';
import {signIn} from 'next-auth/react';

import {useUserDataActor, UseUserDataActorOpts} from '@spinach/next/hooks/userData/actor';
import {DataLookBackRequest, UserDataLoadingOpts} from '@spinach/next/types/userData/load';
import {AdminLookBackInputControl, AdminLookBackInputState} from '@spinach/next/ui/admin/common/lookback/type';
import {getIanaTimezone} from '@spinach/next/utils/date';


type UseAdminLookBackInputOpts = {
  initialRequest?: DataLookBackRequest,
  getDataLoadingOpts: (request: DataLookBackRequest) => UserDataLoadingOpts,
  actorOpts?: UseUserDataActorOpts,
};

export const useAdminLookBackInput = ({
  initialRequest,
  getDataLoadingOpts,
  actorOpts,
}: UseAdminLookBackInputOpts): AdminLookBackInputControl => {
  const now = new Date();

  const actorReturn = useUserDataActor(actorOpts);
  const {act} = actorReturn;
  const [state, setState] = React.useState<AdminLookBackInputState>(() => {
    const initial: DataLookBackRequest = initialRequest ?? {
      startEpochMs: startOfDay(getDateAfterDelta({date: now, delta: {day: -7}})).getTime(),
      endEpochMs: endOfDay(now).getTime(),
      ianaTimezone: getIanaTimezone(),
    };

    return {
      sent: initial,
      control: initial,
      timestamp: Date.now(),
    };
  });

  React.useEffect(() => {
    if (!act) {
      void signIn();
      return;
    }

    void act({
      action: 'load',
      options: getDataLoadingOpts(state.control),
    });
  }, [state.timestamp]);

  const refetch = () => {
    if (!act) {
      void signIn();
      return;
    }

    void act({
      action: 'load',
      options: getDataLoadingOpts(state.control),
    });
  };

  const setInputAndSend = (
    getRequest: (original: DataLookBackRequest) => DataLookBackRequest,
  ) => setState((original) => {
    const request = getRequest(original.control);

    return {
      sent: request,
      control: request,
      timestamp: Date.now(),
    };
  });

  return {...actorReturn, now, state, setState, setInputAndSend, refetch};
};

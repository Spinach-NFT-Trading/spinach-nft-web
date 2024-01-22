import React from 'react';

import {getDateAfterDelta, toIsoUtcDateString} from '@spinach/common/utils/date';
import {signIn} from 'next-auth/react';

import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {UserDataLoadingOpts} from '@spinach/next/types/userData/load';
import {
  AdminLookBackInputControl,
  AdminLookBackInput,
  AdminLookBackInputState,
} from '@spinach/next/ui/admin/members/result/common/lookback/type';


type UseAdminLookBackInputOpts = {
  initialRequest?: AdminLookBackInput,
  getDataLoadingOpts: (request: AdminLookBackInput) => UserDataLoadingOpts,
};

export const useAdminLookBackInput = ({
  initialRequest,
  getDataLoadingOpts,
}: UseAdminLookBackInputOpts): AdminLookBackInputControl => {
  const now = new Date();

  const actorReturn = useUserDataActor();
  const {act} = actorReturn;
  const [request, setRequest] = React.useState<AdminLookBackInputState>(() => {
    const initial: AdminLookBackInput = initialRequest ?? {
      startDate: toIsoUtcDateString(getDateAfterDelta({date: now, delta: {day: -7}})),
      endDate: toIsoUtcDateString(now),
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
      options: getDataLoadingOpts(request.control),
    });
  }, [request.timestamp]);

  const setInputAndSend = (
    getRequest: (original: AdminLookBackInput) => AdminLookBackInput,
  ) => setRequest((original) => {
    const request = getRequest(original.control);

    return {
      sent: request,
      control: request,
      timestamp: Date.now(),
    };
  });

  return {...actorReturn, now, state: request, setState: setRequest, setInputAndSend};
};

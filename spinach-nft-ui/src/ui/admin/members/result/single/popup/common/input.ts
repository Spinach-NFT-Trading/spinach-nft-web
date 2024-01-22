import React from 'react';

import {getDateAfterDelta, toIsoUtcDateString} from '@spinach/common/utils/date';
import {signIn} from 'next-auth/react';

import {useUserDataActor, UseUserDataActorReturn} from '@spinach/next/hooks/userData/actor';
import {
  AdminLookBackPopupRequest,
  AdminLookBackRequestType,
} from '@spinach/next/ui/admin/members/result/single/popup/common/type';


type UseAdminLookBackInputOpts = {
  userId: string,
  requestType: AdminLookBackRequestType,
};

type UseAdminLookBackInputReturn = UseUserDataActorReturn & {
  now: Date,
  request: AdminLookBackPopupRequest,
  setRequest: React.Dispatch<React.SetStateAction<AdminLookBackPopupRequest>>,
};

export const useAdminLookBackInput = ({
  userId,
  requestType,
}: UseAdminLookBackInputOpts): UseAdminLookBackInputReturn => {
  const now = new Date();

  const actorReturn = useUserDataActor();
  const {act} = actorReturn;
  const [request, setRequest] = React.useState<AdminLookBackPopupRequest>({
    userId,
    startDate: toIsoUtcDateString(getDateAfterDelta({date: now, delta: {day: -7}})),
    endDate: toIsoUtcDateString(now),
    timestamp: Date.now(),
  });

  React.useEffect(() => {
    if (!act) {
      void signIn();
      return;
    }

    void act({
      action: 'load',
      options: {
        type: requestType,
        opts: request,
      },
    });
  }, [request.timestamp]);

  return {...actorReturn, now, request, setRequest};
};

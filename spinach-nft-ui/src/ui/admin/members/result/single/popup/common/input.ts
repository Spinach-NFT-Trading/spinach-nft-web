import React from 'react';

import {getDateAfterDelta, toIsoUtcDateString} from '@spinach/common/utils/date';
import {signIn} from 'next-auth/react';

import {useUserDataActor, UseUserDataActorReturn} from '@spinach/next/hooks/userData/actor';
import {DataLookBackRequest} from '@spinach/next/types/userData/load';
import {
  AdminLookBackPopupRequest,
  AdminLookBackRequestType,
} from '@spinach/next/ui/admin/members/result/single/popup/common/type';


type UseAdminLookBackInputOpts = {
  userId: string,
  requestType: AdminLookBackRequestType,
  initialRequest?: DataLookBackRequest,
};

type UseAdminLookBackInputReturn = UseUserDataActorReturn & {
  now: Date,
  request: AdminLookBackPopupRequest,
  setRequest: React.Dispatch<React.SetStateAction<AdminLookBackPopupRequest>>,
  setRequestAndSend: (getRequest: (original: DataLookBackRequest) => DataLookBackRequest) => void,
};

export const useAdminLookBackInput = ({
  userId,
  requestType,
  initialRequest,
}: UseAdminLookBackInputOpts): UseAdminLookBackInputReturn => {
  const now = new Date();

  const actorReturn = useUserDataActor();
  const {act} = actorReturn;
  const [request, setRequest] = React.useState<AdminLookBackPopupRequest>(() => {
    const initial: DataLookBackRequest = initialRequest ?? {
      userId,
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
      options: {
        type: requestType,
        opts: request.control,
      },
    });
  }, [request.timestamp]);

  const setRequestAndSend = (
    getRequest: (original: DataLookBackRequest) => DataLookBackRequest,
  ) => setRequest((original) => {
    const request = getRequest(original.control);

    return {
      sent: request,
      control: request,
      timestamp: Date.now(),
    };
  });

  return {...actorReturn, now, request, setRequest, setRequestAndSend};
};

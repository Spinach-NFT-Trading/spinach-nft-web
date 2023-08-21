import React from 'react';

import {useSession} from 'next-auth/react';

import {UserDataActionStatus, UserDataActor} from '@spinach/next/types/userData/main';


type UseUserDataActorReturn = {
  act: UserDataActor | null,
  status: UserDataActionStatus,
  session: ReturnType<typeof useSession>,
};

export const useUserDataActor = (): UseUserDataActorReturn => {
  const [status, setStatus] = React.useState<UserDataActionStatus>('waiting');
  const session = useSession();

  const userDataActor: UserDataActor = async (action) => {
    setStatus('processing');

    try {
      const updated = await session.update(action);

      setStatus(!!updated?.user.jwtUpdateError ? 'failed' : 'completed');

      return updated;
    } catch (err) {
      console.error(`Failed to [${action.action}] user data of [${action.options.type}]`, err);
      setStatus('failed');
    }

    return null;
  };

  React.useEffect(() => {
    if (status !== 'completed' && status !== 'failed') {
      return;
    }

    const timeoutId = setTimeout(() => setStatus('waiting'), 2500);

    return () => clearTimeout(timeoutId);
  }, [status]);

  return {
    act: session.data ? userDataActor : null,
    status,
    session,
  };
};

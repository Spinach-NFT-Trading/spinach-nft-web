import React from 'react';

import {useSession} from 'next-auth/react';

import {UserDataActorState} from '@spinach/next/hooks/userData/type';
import {UserDataActor} from '@spinach/next/types/userData/main';


type UseUserDataActorOpts = {
  statusNoReset?: boolean,
};

export type UseUserDataActorReturn = UserDataActorState & {
  act: UserDataActor | null,
  session: ReturnType<typeof useSession>,
};

export const useUserDataActor = (opts?: UseUserDataActorOpts): UseUserDataActorReturn => {
  const [state, setState] = React.useState<UserDataActorState>({
    status: 'waiting',
    lazyLoaded: {},
  });
  const session = useSession();

  const userDataActor: UserDataActor = async (action) => {
    setState((original) => ({
      ...original,
      status: 'processing',
    }));

    try {
      const updated = await session.update(action);

      const status = !!updated?.user.jwtUpdateError ? 'failed' : 'completed';

      setState((original) => ({
        status,
        lazyLoaded: {...original.lazyLoaded, ...updated?.user.lazyLoaded},
      }));
      return updated;
    } catch (err) {
      console.error(`Failed to [${action.action}] user data of [${action.options.type}]`, err);

      setState((original) => ({
        ...original,
        status: 'failed',
      }));
    }

    return null;
  };

  React.useEffect(() => {
    const {status} = state;

    if (status !== 'completed' && status !== 'failed' || opts?.statusNoReset) {
      return;
    }

    const timeoutId = setTimeout(
      () => setState((original) => ({
        ...original,
        status: 'waiting',
      })),
      2500,
    );

    return () => clearTimeout(timeoutId);
  }, [state]);

  return {
    ...state,
    act: session.data ? userDataActor : null,
    session,
  };
};

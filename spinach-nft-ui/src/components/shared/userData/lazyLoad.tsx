import React from 'react';

import {Failed} from '@spinach/next/components/icons/failed';
import {Loading} from '@spinach/next/components/icons/loading';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {UserDataLoadingOpts} from '@spinach/next/types/userData/load';
import {UserLazyLoadedData} from '@spinach/next/types/userData/main';


type Props = {
  options: UserDataLoadingOpts,
  loadingText: string,
  content: (data: UserLazyLoadedData | null | undefined) => React.ReactNode,
} & ({
  actDeps: React.DependencyList,
  toAct: () => boolean,
} | {
  actDeps?: never,
  toAct?: never,
});

export const UserDataLazyLoad = ({options, loadingText, content, actDeps, toAct}: Props) => {
  const {
    act,
    status,
    session,
    lazyLoaded,
  } = useUserDataActor();
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (actDeps && !toAct()) {
      return;
    }

    if (!loaded && act && session.status === 'authenticated' && status === 'waiting') {
      void act({action: 'load', options});
    }
  }, [session.status, ...(actDeps ?? [])]);

  React.useEffect(() => {
    if (status === 'completed') {
      setLoaded(true);
    }
  }, [status]);

  // Needs to check if the data is `loaded` because data upload will set `session.status` to `loading`
  if (!loaded) {
    // Loading data through `update()` of the session sets the status to `loading`
    // So this has to be placed before `session.status === `loading` to show correct loading text
    if (status === 'processing') {
      return <Loading text={loadingText}/>;
    }

    if (session.status === 'loading') {
      return <Loading text="User"/>;
    }

    if (session.status === 'unauthenticated') {
      return <>{content(null)}</>;
    }

    if (status === 'failed') {
      return <Failed text={loadingText}/>;
    }

    // If not loaded but got an action to run later, don't show anything to prevent the UI blink
    // between the gap of user getting authenticated and the action starts
    if (status === 'waiting' && act) {
      return <></>;
    }
  }

  return content(lazyLoaded);
};

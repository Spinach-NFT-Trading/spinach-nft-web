import React from 'react';

import {useSessionPoll} from '@spinach/next/hooks/session/poll/main';


export const SessionLoadedContext = ({children}: React.PropsWithChildren) => {
  useSessionPoll();

  return children;
};

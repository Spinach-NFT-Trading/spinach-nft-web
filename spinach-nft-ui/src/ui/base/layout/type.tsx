import React from 'react';

import {Session} from 'next-auth';


export type PageLayoutProps = {
  announcement?: boolean,
  isValid?: (session: Session | null) => boolean,
  sessionOverride?: Session | null,
  children: ((session: Session) => React.ReactNode) | React.ReactNode,
};

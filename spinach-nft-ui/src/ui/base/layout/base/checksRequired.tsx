import React from 'react';

import {redirect} from 'next/navigation';
import {getServerSession, Session} from 'next-auth';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {authOptions} from '@spinach/next/const/auth';
import {PageLayout} from '@spinach/next/ui/base/layout/base/common';
import {PageLayoutProps} from '@spinach/next/ui/base/layout/type';


type Props = PageLayoutProps & {
  isSessionCheckPassed: (session: Session) => boolean,
};

export const SessionCheckRequiredPageLayout = ({
  announcement,
  sessionOverride,
  isValid,
  isSessionCheckPassed,
  children,
}: Props) => {
  const session = React.use(
    sessionOverride ?
      Promise.resolve(sessionOverride) :
      getServerSession(authOptions),
  );

  if (!session || !isSessionCheckPassed(session) || (isValid && !isValid(session))) {
    return redirect('/');
  }

  return (
    <PageLayout announcement={announcement}>
      {session ? (typeof children === 'function' ? children(session) : children) : <SignIn/>}
    </PageLayout>
  );
};

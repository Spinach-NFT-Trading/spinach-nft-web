import React from 'react';

import {SessionCheckRequiredPageLayout} from '@spinach/next/ui/base/layout/base/checksRequired';
import {PageLayoutProps} from '@spinach/next/ui/base/layout/type';
import {isUserElevated} from '@spinach/next/utils/data/user';


export const AdminOrAgentPageLayout = ({
  children,
  ...props
}: PageLayoutProps) => {
  return (
    <SessionCheckRequiredPageLayout
      isSessionCheckPassed={(session) => isUserElevated(session.user)}
      {...props}
    >
      {children}
    </SessionCheckRequiredPageLayout>
  );
};

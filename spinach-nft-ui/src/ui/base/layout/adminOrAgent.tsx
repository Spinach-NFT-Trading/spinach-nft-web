import React from 'react';

import {SessionCheckRequiredPageLayout} from '@spinach/next/ui/base/layout/base/checksRequired';
import {PageLayoutProps} from '@spinach/next/ui/base/layout/type';


export const AdminOrAgentPageLayout = ({
  children,
  ...props
}: PageLayoutProps) => {
  return (
    <SessionCheckRequiredPageLayout
      isSessionCheckPassed={(session) => !!session?.user.isAdmin && !!session?.user.isAgent}
      {...props}
    >
      {children}
    </SessionCheckRequiredPageLayout>
  );
};

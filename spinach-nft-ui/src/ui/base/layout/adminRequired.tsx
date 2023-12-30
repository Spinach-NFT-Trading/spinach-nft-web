import React from 'react';

import {SessionCheckRequiredPageLayout} from '@spinach/next/ui/base/layout/base/checksRequired';
import {PageLayoutProps} from '@spinach/next/ui/base/layout/type';


export const AdminRequiredPageLayout = ({
  children,
  ...props
}: PageLayoutProps) => {
  return (
    <SessionCheckRequiredPageLayout
      isSessionCheckPassed={(session) => !!session?.user.isAdmin}
      {...props}
    >
      {children}
    </SessionCheckRequiredPageLayout>
  );
};

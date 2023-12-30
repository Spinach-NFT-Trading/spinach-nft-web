import React from 'react';

import {SessionCheckRequiredPageLayout} from '@spinach/next/ui/base/layout/base/checksRequired';
import {PageLayoutProps} from '@spinach/next/ui/base/layout/type';


export const LoginRequiredPageLayout = ({
  children,
  ...props
}: PageLayoutProps) => {
  return (
    <SessionCheckRequiredPageLayout
      isSessionCheckPassed={() => true}
      {...props}
    >
      {children}
    </SessionCheckRequiredPageLayout>
  );
};

import React from 'react';

import {PageLayout} from '@spinach/next/ui/base/layout/common';
import {PageLayoutProps} from '@spinach/next/ui/base/layout/type';


export const PublicPageLayout = ({announcement, children}: React.PropsWithChildren<PageLayoutProps>) => {
  return (
    <PageLayout announcement={announcement}>
      {children}
    </PageLayout>
  );
};

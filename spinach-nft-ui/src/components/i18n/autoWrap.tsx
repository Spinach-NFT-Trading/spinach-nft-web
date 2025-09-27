import React from 'react';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {isServerSide} from '@spinach/next/utils/react';


export const I18nAutoWrap = ({children}: React.PropsWithChildren) => {
  if (isServerSide()) {
    return (
      <I18nProvider>
        {children}
      </I18nProvider>
    );
  }

  return children;
};

import React from 'react';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {I18nNamespaces} from '@spinach/next/types/i18n';
import {isServerSide} from '@spinach/next/utils/react';


type Props = {
  namespaces?: I18nNamespaces[],
};

export const I18nAutoWrap = ({namespaces, children}: React.PropsWithChildren<Props>) => {
  if (isServerSide()) {
    return (
      <I18nProvider namespaces={namespaces ?? []}>
        {children}
      </I18nProvider>
    );
  }

  return children;
};

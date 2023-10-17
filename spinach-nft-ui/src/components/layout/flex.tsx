import React from 'react';

import clsx from 'clsx';

import {LayoutProps} from '@spinach/next/components/layout/type';
import {getLayoutClassNames} from '@spinach/next/components/layout/util';


type Props = LayoutProps & {
  direction?: 'row' | 'col',
  wrap?: boolean,
};

export const Flex = ({
  direction = 'col',
  wrap,
  children,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (
    <div className={clsx(
      'flex',
      direction === 'row' ? 'flex-row' : 'flex-col',
      wrap && 'flex-wrap',
      getLayoutClassNames(props),
    )}>
      {children}
    </div>
  );
};

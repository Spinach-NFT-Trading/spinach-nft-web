import React from 'react';

import {FlexCommonProps} from '@spinach/next/components/layout/flex/type';
import {getFlexStyles} from '@spinach/next/components/layout/flex/utils';


type Props = FlexCommonProps & {
  style?: React.CSSProperties,
};

const FlexInternal = ({
  direction = 'col',
  style,
  children,
  ...props
}: React.PropsWithChildren<Props>, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={ref} style={style} className={getFlexStyles(direction, props)}>
      {children}
    </div>
  );
};

export const Flex = React.forwardRef(FlexInternal);

import React from 'react';

import {FlexCommonProps} from '@spinach/next/components/layout/flex/type';
import {getFlexStyles} from '@spinach/next/components/layout/flex/utils';


type Props = FlexCommonProps & {
  onClick: () => void,
  disabled?: boolean,
};

const FlexButtonInternal = ({
  direction = 'row',
  noFullWidth = true,
  onClick,
  disabled,
  children,
  ...props
}: React.PropsWithChildren<Props>, ref: React.ForwardedRef<HTMLButtonElement>) => (
  <button
    ref={ref}
    onClick={onClick}
    disabled={disabled}
    className={getFlexStyles(direction, {noFullWidth, ...props})}
  >
    {children}
  </button>
);

// This is only usable if the children is not a single node of icon
// Otherwise, the icon will fail to render on Apple device
// See https://github.com/RaenonX-PokemonSleep/pokemon-sleep-ui/issues/370
export const FlexButton = React.forwardRef(FlexButtonInternal);

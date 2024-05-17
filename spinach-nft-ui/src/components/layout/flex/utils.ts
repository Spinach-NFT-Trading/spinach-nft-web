import {clsx} from 'clsx';

import {FlexCommonProps, FlexDirection} from '@spinach/next/components/layout/flex/type';
import {getLayoutClassNames} from '@spinach/next/components/layout/util';


export const getFlexStyles = (direction: FlexDirection, props: FlexCommonProps) => {
  const {wrap} = props;

  return clsx(
    'flex',
    direction === 'row' ? 'flex-row' : 'flex-col',
    wrap && 'flex-wrap',
    getLayoutClassNames(props),
  );
};

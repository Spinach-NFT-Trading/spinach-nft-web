import {LayoutProps} from '@spinach/next/components/layout/type';


export type FlexDirection = 'row' | 'col';

export type FlexCommonProps = LayoutProps & {
  direction?: FlexDirection,
  wrap?: boolean,
};

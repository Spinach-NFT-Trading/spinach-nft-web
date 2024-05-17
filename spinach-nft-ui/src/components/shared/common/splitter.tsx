import React from 'react';

import {clsx} from 'clsx';


type Props = {
  className?: string,
};

export const VerticalSplitter = ({className}: Props) => {
  return <div className={clsx('border-r border-r-gray-300', className)}/>;
};

export const HorizontalSplitter = ({className}: Props) => {
  return <hr className={clsx('border-t-gray-300', className)}/>;
};

import React from 'react';

import {clsx} from 'clsx';


type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const InputBox = ({className, ...props}: Props) => (
  <input
    className={clsx('border-b border-gray-300 bg-transparent focus:outline-none', className)}
    {...props}
  />
);

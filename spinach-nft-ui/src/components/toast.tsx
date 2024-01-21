import React from 'react';

import {clsx} from 'clsx';


type Props = {
  visible: boolean,
  isAlert?: boolean,
};

export const Toast = ({visible, isAlert, children}: React.PropsWithChildren<Props>) => {
  return (
    <div className={clsx(
      'rounded-full bg-slate-100/90 px-6 py-4',
      isAlert ? 'text-red-700' : 'text-slate-800',
      visible ? 'animate-enter' : 'animate-leave',
    )}>
      {children}
    </div>
  );
};

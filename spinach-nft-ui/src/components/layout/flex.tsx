import React from 'react';

import clsx from 'clsx';


type Props = {
  direction: 'row' | 'col',
  center?: boolean,
  wrap?: boolean,
  stretch?: boolean,
  noFullWidth?: boolean,
  className?: string,
};

export const Flex = ({
  direction,
  center,
  wrap,
  stretch,
  noFullWidth,
  className,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <div className={clsx(
      'flex',
      direction === 'row' ? 'flex-row' : 'flex-col',
      center && 'content-center items-center justify-center text-center',
      wrap && 'flex-wrap',
      stretch && 'self-stretch',
      !noFullWidth && 'w-full',
      className,
    )}>
      {children}
    </div>
  );
};

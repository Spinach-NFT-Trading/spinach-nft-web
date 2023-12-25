import React from 'react';

import {Transition} from '@headlessui/react';
import {clsx} from 'clsx';

import {Grid} from '@spinach/next/components/layout/grid';


type Props<TKey extends string> = {
  current: TKey,
  contents: {[key in TKey]: React.ReactNode},
  className?: string,
};

export const FadingLayout = <TKey extends string>({current, contents, className}: Props<TKey>) => {
  return (
    <Grid className={clsx('grid-areas-inner-div', className)}>
      {Object.entries(contents).map(([key, content]) => (
        <Transition
          key={key}
          show={key === current}
          enter="duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="overflow-hidden transition-opacity ease-in-out grid-in-inner-div"
        >
          {content as React.ReactNode}
        </Transition>
      ))}
    </Grid>
  );
};

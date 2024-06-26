import React from 'react';

import {Transition, TransitionChild} from '@headlessui/react';
import {clsx} from 'clsx';


type Props = {
  show: boolean,
  appear?: boolean,
  className?: string,
};

export const AnimatedCollapse = ({show, appear, className, children}: React.PropsWithChildren<Props>) => {
  return (
    <Transition
      as="div"
      show={show}
      appear={appear}
      enter="duration-1000"
      enterFrom="grid-rows-[0fr]"
      enterTo="grid-rows-[1fr]"
      leave="duration-1000"
      leaveFrom="grid-rows-[1fr]"
      leaveTo="grid-rows-[0fr]"
      className="grid w-full transition-[grid-template-rows] ease-in-out"
    >
      <TransitionChild
        as="div"
        enter="delay-500 duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className={clsx('overflow-hidden transition-opacity ease-in-out', className)}
      >
        {children}
      </TransitionChild>
    </Transition>
  );
};

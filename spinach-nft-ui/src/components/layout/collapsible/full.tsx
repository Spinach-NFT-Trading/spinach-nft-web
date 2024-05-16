import React from 'react';

import {Transition, TransitionChild} from '@headlessui/react';
import {clsx} from 'clsx';

import {CollapsibleMark} from '@spinach/next/components/layout/collapsible/mark';
import {CollapsibleCommonProps} from '@spinach/next/components/layout/collapsible/type';
import {Flex} from '@spinach/next/components/layout/flex/common';


type Props = CollapsibleCommonProps & {
  disabled?: boolean,
  durationOverride?: `duration-${number}`,
  delayOverride?: `delay-${number}`,
};

export const CollapsibleFull = ({
  state,
  button,
  appear,
  disabled,
  durationOverride,
  delayOverride,
  children,
}: React.PropsWithChildren<Props>) => {
  const {show, setShow} = state;

  React.useEffect(() => {
    if (appear) {
      setShow(true);
    }
  }, []);

  const duration = durationOverride ?? 'duration-1000';
  const delay = delayOverride ?? 'delay-300';

  return (
    <Flex>
      <button onClick={() => setShow(!show)} disabled={disabled} className={clsx(
        'button-clickable-bg disabled:button-disabled group relative p-1',
      )}>
        <CollapsibleMark show={show}/>
        {button}
      </button>
      <Transition
        as="div"
        show={show}
        enterFrom="p-0"
        enterTo="p-1"
        leaveFrom="p-1"
        leaveTo="p-0"
        className="rounded-b-lg border-x border-b transition-all duration-300 ease-in-out"
      >
        <TransitionChild
          as="div"
          appear={appear}
          enter={duration}
          enterFrom="grid-rows-[0fr]"
          enterTo="grid-rows-[1fr]"
          leave={duration}
          leaveFrom="grid-rows-[1fr]"
          leaveTo="grid-rows-[0fr]"
          className="grid w-full transition-[grid-template-rows] ease-in-out"
        >
          <TransitionChild
            as="div"
            enter={`${delay} ${duration}`}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave={duration}
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="overflow-hidden transition-opacity ease-in-out"
          >
            {children}
          </TransitionChild>
        </TransitionChild>
      </Transition>
    </Flex>
  );
};

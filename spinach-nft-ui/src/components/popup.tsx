'use client';
import React from 'react';

import {Dialog, Transition} from '@headlessui/react';
import clsx from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex/common';


type Props = {
  className?: string,
} & ({
  show: boolean,
  setShow: (show: boolean) => void,
} | {
  show?: never,
  setShow?: never,
});

export const Popup = ({show, setShow, children, className}: React.PropsWithChildren<Props>) => {
  return (
    <Transition.Root show={show ?? true} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setShow ? setShow(false) : void 0}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75"/>
        </Transition.Child>
        <div className="transform-smooth fixed inset-0 flex items-center justify-center p-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className={clsx(
              'flex w-full justify-center rounded-lg p-3 sm:w-fit sm:max-w-2xl',
              'bg-gray-950 ring-1 ring-inset ring-gray-600',
              className,
            )}>
              <Flex className="max-h-[80vh] overflow-y-auto">
                {children}
              </Flex>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

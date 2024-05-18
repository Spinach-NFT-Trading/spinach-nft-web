import React from 'react';

import {Dialog, DialogPanel, Transition, TransitionChild} from '@headlessui/react';
import {clsx} from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex/common';


type Props = {
  show: boolean,
  setShow: (show: boolean) => void,
  className?: string,
};

export const Popup = ({show, setShow, children, className}: React.PropsWithChildren<Props>) => {
  return (
    <Transition show={show ?? true}>
      <Dialog as="div" className="relative z-50" onClose={() => setShow ? setShow(false) : void 0}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75"/>
        </TransitionChild>
        <div className="transform-smooth fixed inset-0 flex items-center justify-center p-4 text-center">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel className={clsx(
              'flex w-full justify-center rounded-lg p-3 sm:w-fit sm:max-w-2xl',
              'bg-gray-950 ring-1 ring-inset ring-gray-600',
              className,
            )}>
              <Flex className="max-h-[80vh] overflow-y-auto">
                {children}
              </Flex>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

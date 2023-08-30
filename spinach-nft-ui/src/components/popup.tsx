'use client';
import React from 'react';

import {Dialog, Transition} from '@headlessui/react';
import clsx from 'clsx';


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
          <div className="fixed inset-0 bg-white/75"/>
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
              'bg-slate-200 ring-1 ring-inset ring-slate-400',
              className,
            )}>
              <div className="max-h-96 overflow-y-auto">
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

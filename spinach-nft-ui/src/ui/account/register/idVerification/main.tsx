import React from 'react';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {InputFileImageOnly} from '@spinach/next/components/shared/common/input/file/image';
import {AccountRegisterCommonProps} from '@spinach/next/ui/account/register/type';


export const AccountRegisterIdVerification = ({show, setInput, onComplete}: AccountRegisterCommonProps) => {
  return (
    <AnimatedCollapse show={show}>
      <form className="flex flex-col gap-2" onSubmit={(e) => {
        e.preventDefault();
        onComplete();
      }}>
        <InputFileImageOnly
          id="primaryFront"
          onFileSelected={(idImage) => setInput((original) => ({...original, idImage}))}
          onFileTypeIncorrect={(type) => console.error(`Incorrect file type: ${type}`)}
        />
        <button type="submit" className="button-clickable-bg w-full p-2">
          註冊
        </button>
      </form>
    </AnimatedCollapse>
  );
};

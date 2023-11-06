import React from 'react';

import {mimeTypesOfImage} from '@spinach/common/types/common/mime';

import {InputFile} from '@spinach/next/components/shared/common/input/file/main';
import {InputFileCommonProps} from '@spinach/next/components/shared/common/input/file/type';


type Props = InputFileCommonProps & React.InputHTMLAttributes<HTMLInputElement>;

export const InputFileImageOnly = (props: Props) => {
  return (
    <InputFile
      {...props}
      accept={[...mimeTypesOfImage]}
    />
  );
};

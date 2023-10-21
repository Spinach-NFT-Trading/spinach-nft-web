import React from 'react';

import {InputFile} from '@spinach/next/components/shared/common/input/file/main';
import {InputFileCommonProps} from '@spinach/next/components/shared/common/input/file/type';
import {mimeTypesOfImage} from '@spinach/next/types/mime';


type Props = InputFileCommonProps & React.InputHTMLAttributes<HTMLInputElement>;

export const InputFileImageOnly = (props: Props) => {
  return (
    <InputFile
      {...props}
      accept={[...mimeTypesOfImage]}
    />
  );
};

import React from 'react';

import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
import {AdminMembersSearchInputProps} from '@spinach/next/ui/admin/members/input/type';
import {AdminMembersFilterInput} from '@spinach/next/ui/admin/members/type';


type Props = AdminMembersSearchInputProps & {
  dataKey: keyof AdminMembersFilterInput,
  title: string,
};

export const AdminMembersSearchInputField = ({dataKey, title, input, setInput}: Props) => {
  return (
    <InputFloatingLabel
      id={dataKey}
      placeholder={title}
      type="text"
      value={input[dataKey]}
      onChange={({target}) => setInput((original) => ({
        ...original,
        [dataKey]: target.value,
      } satisfies AdminMembersFilterInput))}
    />
  );
};

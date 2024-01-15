import React from 'react';

import {DropDown} from '@spinach/next/components/dropdown/main';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {InputBox} from '@spinach/next/components/shared/common/input/box';
import {adminMembersSearchKeyName} from '@spinach/next/ui/admin/members/const';
import {AdminMembersSearchInputProps} from '@spinach/next/ui/admin/members/input/type';
import {adminMembersFilterBasis, AdminMembersFilterInput} from '@spinach/next/ui/admin/members/type';


export const AdminMembersSearchInput = ({input, setInput}: AdminMembersSearchInputProps) => {
  const {key} = input;

  return (
    <Flex direction="row" className="gap-1.5 p-1.5">
      <DropDown
        origin="topLeft"
        renderButton={(DropdownMenuButton) => (
          <DropdownMenuButton className="button-clickable-bg whitespace-nowrap px-2 py-1">
            {adminMembersSearchKeyName[key]}
          </DropdownMenuButton>
        )}
        itemList={[
          adminMembersFilterBasis.map((basis) => (
            <button key={basis} className="button-clickable-bg whitespace-nowrap px-2 py-1" onClick={() => setInput({
              key: basis,
              value: '',
            })}>
              {adminMembersSearchKeyName[basis]}
            </button>
          )),
        ]}
      />
      <InputBox
        type="text"
        value={input.value}
        onChange={({target}) => setInput((original) => ({
          ...original,
          value: target.value,
        } satisfies AdminMembersFilterInput))}
        className="w-full"
      />
    </Flex>
  );
};

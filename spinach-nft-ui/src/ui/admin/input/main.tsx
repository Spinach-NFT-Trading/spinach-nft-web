import React from 'react';

import {DropDown} from '@spinach/next/components/dropdown/main';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {InputBox} from '@spinach/next/components/shared/common/input/box';
import {AdminDataSearchInput, AdminDataSearchInputProps} from '@spinach/next/ui/admin/input/type';


export const AdminDataSearchInputUi = <TKey extends string>({
  input,
  setInput,
  availableSearchKeys,
  getSearchKeyName,
}: AdminDataSearchInputProps<TKey>) => {
  const {key} = input;

  return (
    <Flex direction="row" className="gap-1.5">
      <DropDown
        origin="topLeft"
        renderButton={(DropdownMenuButton) => (
          <DropdownMenuButton className="button-clickable-bg whitespace-nowrap px-2 py-1">
            {getSearchKeyName(key)}
          </DropdownMenuButton>
        )}
        itemList={[
          availableSearchKeys.map((basis) => (
            <button key={basis} className="button-clickable-bg whitespace-nowrap px-2 py-1" onClick={() => setInput({
              key: basis,
              value: '',
            } satisfies AdminDataSearchInput<TKey>)}>
              {getSearchKeyName(basis)}
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
        } satisfies AdminDataSearchInput<TKey>))}
        className="w-full"
      />
    </Flex>
  );
};

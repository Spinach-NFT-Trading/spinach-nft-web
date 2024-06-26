import React from 'react';

import {Menu, MenuButton, MenuItem, MenuItems, Transition} from '@headlessui/react';
import {clsx} from 'clsx';

import {dropdownExpandStyle} from '@spinach/next/components/dropdown/const';
import {DropdownExpandOrigin, DropdownItemList} from '@spinach/next/components/dropdown/type';
import {Flex} from '@spinach/next/components/layout/flex/common';


type Props = {
  itemList: DropdownItemList,
  origin: DropdownExpandOrigin,
  renderButton: (DropdownMenuButton: typeof MenuButton) => React.ReactNode,
};

export const DropDown = ({renderButton, itemList, origin}: Props) => {
  return (
    <Menu as="div" className="relative w-fit">
      {renderButton(MenuButton)}
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className={clsx(
          'divide-horizontal border-common absolute z-50 w-fit rounded-lg border bg-slate-800',
          dropdownExpandStyle[origin],
        )}>
          {itemList.map((group, idxGroup) => (
            <Flex key={idxGroup} className="gap-1 p-1">
              {group.map((item, idxItem) => (
                <MenuItem key={idxItem}>
                  {item}
                </MenuItem>
              ))}
            </Flex>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
};

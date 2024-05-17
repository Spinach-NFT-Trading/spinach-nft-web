import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {OverflowableTableProps} from '@spinach/next/components/shared/common/table/overflowable/type';


export const OverflowableTable = <TData, >({
  data,
  header,
  getKey,
  renderRow,
  classOfRow,
}: OverflowableTableProps<TData>) => {
  return (
    <Flex noFullWidth className="overflow-x-auto">
      <Flex direction="row" noFullWidth className="w-max items-center [&>*]:shrink-0">
        {header}
      </Flex>
      {data.map((entry) => (
        <Flex key={getKey(entry)} direction="row" noFullWidth className={clsx(
          'items-center [&>*]:shrink-0',
          classOfRow,
        )}>
          {renderRow({data: entry})}
        </Flex>
      ))}
    </Flex>
  );
};

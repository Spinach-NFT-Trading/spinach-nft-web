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
      <table className="[&_td]:whitespace-nowrap [&_td]:p-2">
        <thead className="w-max [&>*]:shrink-0">
          {header}
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={getKey(entry)} className={clsx('items-center [&>*]:shrink-0', classOfRow)}>
              {renderRow({data: entry})}
            </tr>
          ))}
        </tbody>
      </table>
    </Flex>
  );
};

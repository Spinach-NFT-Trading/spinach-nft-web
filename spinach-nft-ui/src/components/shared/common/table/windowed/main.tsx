import React from 'react';

import {clsx} from 'clsx';
import AutoSizer from 'react-virtualized-auto-sizer';
import {FixedSizeList} from 'react-window';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {WindowedTableProps} from '@spinach/next/components/shared/common/table/windowed/type';


export const WindowedTable = <TData, >({
  data,
  itemHeight,
  header,
  getKey,
  renderRow,
  classOfRow,
}: WindowedTableProps<TData>) => {
  return (
    <AutoSizer disableWidth>
      {({height}) => (
        <FixedSizeList
          height={height}
          itemCount={data.length + 1}
          itemSize={itemHeight}
          itemData={[null, ...data]}
          itemKey={(idx, data) => getKey(data[idx]) ?? 'header'}
          width="100%"
          overscanCount={10}
          innerElementType={({children}: React.PropsWithChildren) => (
            <Flex noFullWidth className="h-full w-max">
              <Flex direction="row" noFullWidth style={{height: itemHeight}} className={clsx(
                'sticky left-0 top-0 z-20 items-center gap-1 bg-slate-900/90 p-2 [&>div]:shrink-0',
              )}>
                {header}
              </Flex>
              {children}
            </Flex>
          )}
        >
          {({style, data, index}) => {
            // Extracting `width` out because it causes breaks on sticky row header if any
            const {width, ...styleToUse} = style;
            const single = data[index];

            if (!single) {
              return null;
            }

            return (
              <Flex direction="row" noFullWidth style={styleToUse} className={clsx(
                'items-center gap-1 p-2 [&>*]:shrink-0',
                classOfRow,
              )}>
                {renderRow({data: single})}
              </Flex>
            );
          }}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

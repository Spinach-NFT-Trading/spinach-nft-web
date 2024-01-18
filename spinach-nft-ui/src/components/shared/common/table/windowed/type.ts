import React from 'react';

import {Nullable} from '@spinach/common/types/common/typing';


export type RenderWindowedTableRowOpts<TData> = {
  data: TData,
};

export type WindowedTableProps<TData> = {
  data: TData[],
  itemHeight: number,
  header: React.ReactNode,
  getKey: (data: Nullable<TData>) => Nullable<React.Key>,
  renderRow: (opts: RenderWindowedTableRowOpts<TData>) => React.ReactNode,
  classOfRow?: string,
};

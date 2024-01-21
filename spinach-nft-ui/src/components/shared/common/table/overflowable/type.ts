import React from 'react';

import {Nullable} from '@spinach/common/types/common/typing';


export type RenderOverflowableTableRowOpts<TData> = {
  data: TData,
};

export type OverflowableTableProps<TData> = {
  data: TData[],
  header: React.ReactNode,
  getKey: (data: Nullable<TData>) => Nullable<React.Key>,
  renderRow: (opts: RenderOverflowableTableRowOpts<TData>) => React.ReactNode,
  classOfRow?: string,
};

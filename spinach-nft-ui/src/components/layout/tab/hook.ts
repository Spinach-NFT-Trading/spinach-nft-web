import React from 'react';

import {TabbedContentControl} from '@spinach/next/components/layout/tab/type';


export const useTabbedContentControl = <TKey extends string>(defaultKey: TKey): TabbedContentControl<TKey> => {
  const [current, setCurrent] = React.useState<TKey>(defaultKey);

  return {current, setCurrent};
};

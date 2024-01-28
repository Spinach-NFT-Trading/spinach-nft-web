import React from 'react';


export type TabbedContentControl<TKey extends string> = {
  current: TKey,
  setCurrent: React.Dispatch<React.SetStateAction<TKey>>,
};

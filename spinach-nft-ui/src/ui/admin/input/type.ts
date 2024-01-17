import React from 'react';


export type AdminDataSearchInput<TKey extends string> = {
  key: TKey,
  value: string,
};

export type AdminDataSearchInputProps<TKey extends string> = {
  input: AdminDataSearchInput<TKey>,
  setInput: React.Dispatch<React.SetStateAction<AdminDataSearchInput<TKey>>>,
  availableSearchKeys: TKey[],
  getSearchKeyName: (key: TKey) => string,
};

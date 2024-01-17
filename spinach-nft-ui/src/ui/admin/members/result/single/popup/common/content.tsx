import React from 'react';

import {Nullable} from '@spinach/common/types/common/typing';

import {Loading} from '@spinach/next/components/icons/loading';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataActionStatus} from '@spinach/next/types/userData/main';


type Props<TData> = {
  data: Nullable<TData[]>,
  status: UserDataActionStatus,
  renderEntry: (entry: TData) => React.ReactNode,
  textOnLoading: string,
  textOnNoResult: string,
};

export const AdminTimelineLookBackResultContent = <TData, >({
  data,
  status,
  renderEntry,
  textOnLoading,
  textOnNoResult,
}: Props<TData>) => {
  if (status === 'processing') {
    return <Loading text={textOnLoading}/>;
  }

  if (!data?.length) {
    return textOnNoResult;
  }

  return (
    <Flex noFullWidth>
      {data.map(renderEntry)}
    </Flex>
  );
};

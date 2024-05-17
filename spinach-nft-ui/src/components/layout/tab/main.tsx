import React from 'react';

import {clsx} from 'clsx';

import {FadingLayout} from '@spinach/next/components/layout/fading/main';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {tabbedContentStyle} from '@spinach/next/components/layout/tab/const';
import {TabbedContentControl} from '@spinach/next/components/layout/tab/type';


type Props<TKey extends string> = {
  keys: TKey[],
  control: TabbedContentControl<TKey>,
  content: {[key in TKey]: React.ReactNode},
  tabTitle: {[key in TKey]: React.ReactNode},
  getReactKey: (key: TKey) => string,
  classOfContents?: string,
};

export const TabbedContent = <TKey extends string>({
  keys,
  control,
  tabTitle,
  content,
  getReactKey,
  classOfContents,
}: Props<TKey>) => {
  const {current, setCurrent} = control;

  return (
    <Flex>
      <div className="border-b border-gray-200 text-center text-gray-500">
        <Flex direction="row" wrap className="-mb-px">
          {keys.map((key) => (
            <button key={getReactKey(key)} onClick={() => setCurrent(key)} className={clsx(
              tabbedContentStyle.common,
              current === key ? tabbedContentStyle.active : tabbedContentStyle.inactive,
            )}>
              {tabTitle[key]}
            </button>
          ))}
        </Flex>
      </div>
      <FadingLayout current={current} contents={content} className={classOfContents}/>
    </Flex>
  );
};

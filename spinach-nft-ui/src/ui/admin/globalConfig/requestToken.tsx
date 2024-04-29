import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import {signIn} from 'next-auth/react';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {CopyButton} from '@spinach/next/components/shared/copy';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';


export const AdminRequestToken = () => {
  const [tokenList, setTokenList] = React.useState<string[]>([]);
  const {act} = useUserDataActor({statusToast: true});

  React.useEffect(() => {
    if (!act) {
      void signIn();
      return;
    }

    act({
      action: 'load',
      options: {type: 'adminTokenList'},
    }).then((session) => setTokenList(session?.user.lazyLoaded.adminTokenList ?? []));
  }, []);

  return (
    <Flex className="gap-1">
      <FlexButton className="button-clickable-border w-fit items-center gap-1 p-1.5" onClick={async () => {
        if (!act) {
          return;
        }

        act({
          action: 'load',
          options: {type: 'adminTokenGeneration'},
        }).then((session) => {
          const newToken = session?.user.lazyLoaded.adminTokenGeneration;
          if (!newToken) {
            return;
          }

          setTokenList((original) => ([...original, newToken]));
        });
      }}>
        <PlusCircleIcon className="size-5"/>
        <span>新增請求權杖</span>
      </FlexButton>
      {tokenList.map((token) => (
        <Flex key={token} direction="row" center noFullWidth className="w-fit gap-1 rounded-lg p-1.5">
          <pre className="overflow-y-auto text-lg">
            {token}
          </pre>
          <Flex noFullWidth>
            <CopyButton data={token}/>
          </Flex>
          <FlexButton className="button-clickable-border w-fit items-center gap-1 p-1" onClick={async () => {
            if (!act) {
              return;
            }

            void act({
              action: 'request',
              options: {type: 'admin.token.delete', data: {token}},
            });
            setTokenList((original) => original.filter((tokenInList) => tokenInList !== token));
          }}>
            <TrashIcon className="size-4"/>
            <span className="text-sm">刪除</span>
          </FlexButton>
        </Flex>
      ))}
    </Flex>
  );
};

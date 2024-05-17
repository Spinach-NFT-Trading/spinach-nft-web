import React from 'react';

import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import {NftExchangeToken, NftExchangeTokenMap} from '@spinach/common/types/data/nft/token';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {InputBox} from '@spinach/next/components/shared/common/input/box';
import {CopyButton} from '@spinach/next/components/shared/copy';
import {UserDataActor} from '@spinach/next/types/userData/main';


type Props = {
  act: UserDataActor,
  tokenData: NftExchangeToken,
  setTokenMap: React.Dispatch<React.SetStateAction<NftExchangeTokenMap>>,
};

export const AdminExchangeTokenSingle = ({act, tokenData, setTokenMap}: Props) => {
  const {token, webhook} = tokenData;

  return (
    <Flex>
      <Flex direction="row" center className="gap-2">
        <pre className="overflow-y-auto text-lg">
          {token}
        </pre>
        <CopyButton data={token}/>
      </Flex>
      <Flex direction="row" center className="gap-2">
        <span>Webhook</span>
        <InputBox
          type="text"
          value={webhook}
          onChange={({target}) => setTokenMap((original) => ({
            ...original,
            [token]: {
              ...tokenData,
              webhook: target.value,
            },
          }))}
          className="w-full"
        />
        <FlexButton className="button-clickable-border w-fit shrink-0 items-center gap-1 p-1" onClick={async () => {
          if (!act) {
            return;
          }

          await act({
            action: 'request',
            options: {type: 'admin.token.delete', data: {token}},
          });
          setTokenMap((original) => {
            const updated = {...original};
            delete updated[token];

            return updated;
          });
        }}>
          <TrashIcon className="size-4"/>
          <span className="text-sm">刪除</span>
        </FlexButton>
      </Flex>
    </Flex>
  );
};

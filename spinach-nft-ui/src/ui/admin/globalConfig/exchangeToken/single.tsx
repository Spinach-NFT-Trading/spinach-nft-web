import React from 'react';

import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import {NftExchangeToken, NftExchangeTokenMap} from '@spinach/common/types/data/nft/token';
import {clsx} from 'clsx';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {InputBox} from '@spinach/next/components/shared/common/input/box';
import {CopyButton} from '@spinach/next/components/shared/copy';
import {UserDataActionStatus, UserDataActor} from '@spinach/next/types/userData/main';


type Props = {
  act: UserDataActor,
  status: UserDataActionStatus,
  tokenData: NftExchangeToken,
  setTokenMap: React.Dispatch<React.SetStateAction<NftExchangeTokenMap>>,
};

export const AdminExchangeTokenSingle = ({act, status, tokenData, setTokenMap}: Props) => {
  const {token, webhook} = tokenData;

  const updateExchangeToken = async () => {
    if (!act) {
      return;
    }

    await act({
      action: 'request',
      options: {type: 'admin.token.update', data: {token, webhook}},
    });
  };

  const loading = status === 'processing';

  return (
    <Flex>
      <Flex direction="row" center className="gap-2">
        <pre className="overflow-y-auto text-lg">
          {token}
        </pre>
        <CopyButton data={token}/>
      </Flex>
      <FlexForm direction="row" center className="gap-2" onSubmit={updateExchangeToken}>
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
        <FlexButton isSubmit disabled={loading} className={clsx(
          'button-clickable-border disabled:button-disabled w-fit shrink-0 items-center gap-1 p-1',
        )}>
          <CloudArrowUpIcon className="size-5"/>
          <span className="text-sm">更新</span>
        </FlexButton>
        <FlexButton
          className="button-clickable-border disabled:button-disabled w-fit shrink-0 items-center gap-1 p-1"
          disabled={loading}
          onClick={async () => {
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
          }}
        >
          <TrashIcon className="size-5"/>
          <span className="text-sm">刪除</span>
        </FlexButton>
      </FlexForm>
    </Flex>
  );
};

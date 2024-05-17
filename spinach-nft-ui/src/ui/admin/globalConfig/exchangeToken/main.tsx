import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {NftExchangeTokenMap} from '@spinach/common/types/data/nft/token';
import {isNotNullish} from '@spinach/common/utils/type';
import {clsx} from 'clsx';
import {signIn} from 'next-auth/react';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {InputBox} from '@spinach/next/components/shared/common/input/box';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {AdminExchangeTokenSingle} from '@spinach/next/ui/admin/globalConfig/exchangeToken/single';


export const AdminExchangeToken = () => {
  const [tokenMap, setTokenMap] = React.useState<NftExchangeTokenMap>({});
  const [webhook, setWebhook] = React.useState('');

  const {act, status} = useUserDataActor({statusToast: true});

  React.useEffect(() => {
    if (!act) {
      void signIn();
      return;
    }

    act({
      action: 'load',
      options: {type: 'adminExchangeTokenMap'},
    }).then((session) => setTokenMap(session?.user.lazyLoaded.adminExchangeTokenMap ?? {}));
  }, []);

  if (!act) {
    return null;
  }

  return (
    <Flex className="gap-1">
      <FlexForm direction="row" center className="gap-2" onSubmit={async () => {
        if (!act) {
          return;
        }

        act({
          action: 'load',
          options: {type: 'adminExchangeTokenGeneration', opts: {webhook}},
        }).then((session) => {
          const newToken = session?.user.lazyLoaded.adminExchangeTokenGeneration;
          if (!newToken) {
            return;
          }

          setTokenMap((original) => ({
            ...original,
            [newToken.token]: newToken,
          }));
        });
      }}>
        <span>Webhook</span>
        <InputBox
          type="text"
          value={webhook}
          onChange={({target}) => setWebhook(target.value)}
          className="w-full"
        />
        <FlexButton isSubmit disabled={!webhook} className={clsx(
          'button-clickable-border disabled:button-disabled-border w-fit shrink-0 items-center gap-1 p-1.5',
        )}>
          <PlusCircleIcon className="size-5"/>
          <span>新增請求權杖</span>
        </FlexButton>
      </FlexForm>
      <Flex className="info-section gap-1">
        {Object.values(tokenMap).filter(isNotNullish).map((tokenData) => (
          <AdminExchangeTokenSingle
            key={tokenData.token}
            act={act}
            status={status}
            tokenData={tokenData}
            setTokenMap={setTokenMap}
          />
        ))}
      </Flex>
    </Flex>
  );
};

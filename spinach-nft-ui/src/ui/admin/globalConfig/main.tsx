import React from 'react';

import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import {GlobalConfig} from '@spinach/common/types/data/global';
import {signIn} from 'next-auth/react';

import {Loading} from '@spinach/next/components/icons/loading';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {AdminGlobalConfigNumberInput} from '@spinach/next/ui/admin/globalConfig/input';


export const AdminGlobalConfigUi = () => {
  const [config, setConfig] = React.useState<GlobalConfig | null>(null);

  const {status, act} = useUserDataActor();

  React.useEffect(() => {
    if (!act) {
      void signIn();
      return;
    }

    act({
      action: 'load',
      options: {type: 'globalConfig'},
    }).then((result) => setConfig(result?.user.lazyLoaded.globalConfig ?? null));
  }, []);

  if (!config) {
    return <Loading/>;
  }

  const {cashbackPercent, thirdPartyCommissionPercent} = config;

  return (
    <Flex className="gap-1.5">
      <Flex className="items-end">
        <button
          className="button-clickable-bg disabled:button-disabled w-fit rounded-lg p-1"
          onClick={async () => {
            if (!act) {
              return;
            }

            await act({
              action: 'request',
              options: {type: 'admin.config.update', data: config},
            });
          }}
          disabled={status === 'processing'}
        >
          <CloudArrowUpIcon className="size-7"/>
        </button>
      </Flex>
      <div className="info-section text-lg">返金 %</div>
      <AdminGlobalConfigNumberInput
        title="台幣"
        value={cashbackPercent.twBank}
        onChange={(twBank) => setConfig({
          ...config,
          cashbackPercent: {...cashbackPercent, twBank},
        })}
      />
      <AdminGlobalConfigNumberInput
        title="USDT"
        value={cashbackPercent.crypto}
        onChange={(crypto) => setConfig({
          ...config,
          cashbackPercent: {...cashbackPercent, crypto},
        })}
      />
      <div className="info-section text-lg">其他</div>
      <AdminGlobalConfigNumberInput
        title="第三方退傭"
        value={thirdPartyCommissionPercent}
        onChange={(thirdPartyCommissionPercent) => setConfig({
          ...config,
          thirdPartyCommissionPercent,
        })}
      />
    </Flex>
  );
};

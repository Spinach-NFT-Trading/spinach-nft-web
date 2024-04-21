import React from 'react';

import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import {GlobalConfig} from '@spinach/common/types/data/global';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {AdminGlobalConfigNumberInput} from '@spinach/next/ui/admin/globalConfig/input';


type Props = {
  initial: GlobalConfig,
};

export const AdminGlobalConfigUi = ({initial}: Props) => {
  const [config, setConfig] = React.useState<GlobalConfig>(initial);

  const {cashbackPercent, thirdPartyCommissionPercent} = config;

  const {status, act} = useUserDataActor();

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
        onChange={(twBank) => setConfig(({cashbackPercent, ...original}) => ({
          ...original,
          cashbackPercent: {...cashbackPercent, twBank},
        } satisfies GlobalConfig))}
      />
      <AdminGlobalConfigNumberInput
        title="USDT"
        value={cashbackPercent.crypto}
        onChange={(crypto) => setConfig(({cashbackPercent, ...original}) => ({
          ...original,
          cashbackPercent: {...cashbackPercent, crypto},
        } satisfies GlobalConfig))}
      />
      <div className="info-section text-lg">其他</div>
      <AdminGlobalConfigNumberInput
        title="第三方退傭"
        value={thirdPartyCommissionPercent}
        onChange={(thirdPartyCommissionPercent) => setConfig((original) => ({
          ...original,
          thirdPartyCommissionPercent,
        } satisfies GlobalConfig))}
      />
    </Flex>
  );
};

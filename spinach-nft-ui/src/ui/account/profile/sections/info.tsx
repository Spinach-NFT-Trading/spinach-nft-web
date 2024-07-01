import React from 'react';

import IdentificationIcon from '@heroicons/react/24/outline/IdentificationIcon';
import {UserInfo} from '@spinach/common/types/common/user/info';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {CopyButton} from '@spinach/next/components/shared/copy';
import {AccountProfileCell} from '@spinach/next/ui/account/profile/sections/common/cell';
import {generateAgentReferralLink} from '@spinach/next/utils/data/agent';


type Props = {
  userInfo: UserInfo,
};

export const AccountProfileInfo = ({userInfo}: Props) => {
  const {
    id,
    username,
    email,
    name,
    idNumber,
    birthday,
    lineId,
    wallet,
    status,
    isAgent,
  } = userInfo;

  const agentReferralLink = generateAgentReferralLink(id);

  return (
    <Flex className="info-section gap-1">
      <Flex className="md:flex-row">
        <Flex className="gap-1">
          <AccountProfileCell title="用戶 ID" info={username}/>
          <AccountProfileCell title="Email" info={email}/>
          <AccountProfileCell title="LINE ID" info={lineId}/>
          <AccountProfileCell title="錢包地址" info={wallet}/>
        </Flex>
        <Flex className="gap-1">
          <AccountProfileCell title="姓名" info={name}/>
          <AccountProfileCell title="身份證字號" info={idNumber}/>
          <AccountProfileCell title="生日" info={birthday}/>
        </Flex>
      </Flex>
      <AnimatedCollapse show={isAgent}>
        <AccountProfileCell
          title="邀請連結"
          info={
            <Flex direction="row" center className="gap-2 rounded-lg bg-slate-950/70 p-1.5">
              <pre className="overflow-y-auto text-lg">
                {agentReferralLink}
              </pre>
              <Flex noFullWidth>
                <CopyButton data={agentReferralLink}/>
              </Flex>
            </Flex>
          }
        />
      </AnimatedCollapse>
      <AnimatedCollapse show={status === 'rejected'}>
        <Flex className="items-end">
          <FlexLink href="/account/verify/id" className="button-clickable-bg gap-1 p-1.5">
            <IdentificationIcon className="size-6"/>
            <div>重新提交身分驗證資料</div>
          </FlexLink>
        </Flex>
      </AnimatedCollapse>
    </Flex>
  );
};

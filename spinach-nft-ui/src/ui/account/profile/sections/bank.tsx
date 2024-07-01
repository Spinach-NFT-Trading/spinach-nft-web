import React from 'react';

import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import {UserInfo} from '@spinach/common/types/common/user/info';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {Grid} from '@spinach/next/components/layout/grid';
import {VerificationStatusUi} from '@spinach/next/components/shared/common/verified';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AccountProfileCell} from '@spinach/next/ui/account/profile/sections/common/cell';


type Props = {
  userInfo: UserInfo,
};

export const AccountBankDetails = ({userInfo}: Props) => {
  return (
    <Flex className="info-section gap-1">
      <div className="text-3xl">
        銀行帳號
      </div>
      <UserDataLazyLoad
        options={{
          type: 'bankDetails',
          opts: {userId: userInfo.id},
        }}
        loadingText="銀行帳號"
        content={(lazyLoaded) => {
          const bankDetails = lazyLoaded?.bankDetails;

          if (!bankDetails || !bankDetails.length) {
            return '無相關銀行帳號';
          }

          return (
            <Grid className="grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-3">
              {bankDetails.map(({status, account, code}) => (
                <AnimatedCollapse key={account} show appear>
                  <Flex className="gap-1">
                    <VerificationStatusUi status={status}/>
                    <AccountProfileCell title="銀行代碼" info={code}/>
                    <AccountProfileCell title="銀行帳號" info={account}/>
                  </Flex>
                </AnimatedCollapse>
              ))}
            </Grid>
          );
        }}
      />
      <FlexLink href="/account/bank" className="button-clickable-bg self-end p-1.5">
        <DocumentTextIcon className="size-6"/>
        <div>新增銀行帳號</div>
      </FlexLink>
    </Flex>
  );
};

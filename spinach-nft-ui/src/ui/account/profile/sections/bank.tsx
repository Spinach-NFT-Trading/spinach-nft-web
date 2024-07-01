import React from 'react';

import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import {UserInfo} from '@spinach/common/types/common/user/info';
import {useTranslations} from 'next-intl';

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
  const t = useTranslations('UI.Account');
  const t2 = useTranslations('UI.InPage.Account.Profile');

  return (
    <Flex className="info-section gap-1">
      <div className="text-3xl">
        {t('BankAccounts.Name')}
      </div>
      <UserDataLazyLoad
        options={{
          type: 'bankDetails',
          opts: {userId: userInfo.id},
        }}
        loadingText={t('BankAccounts.Name')}
        content={(lazyLoaded) => {
          const bankDetails = lazyLoaded?.bankDetails;

          if (!bankDetails || !bankDetails.length) {
            return t2('NoAssociatedBankAccounts');
          }

          return (
            <Grid className="grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-3">
              {bankDetails.map(({status, account, code}) => (
                <AnimatedCollapse key={account} show appear>
                  <Flex className="gap-1">
                    <VerificationStatusUi status={status}/>
                    <AccountProfileCell title={t('BankAccounts.Code')} info={code}/>
                    <AccountProfileCell title={t('BankAccounts.Account')} info={account}/>
                  </Flex>
                </AnimatedCollapse>
              ))}
            </Grid>
          );
        }}
      />
      <FlexLink href="/account/bank" className="button-clickable-bg self-end p-1.5">
        <DocumentTextIcon className="size-6"/>
        <div>{t2('AddBankAccount')}</div>
      </FlexLink>
    </Flex>
  );
};

import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {VerificationStatusUi} from '@spinach/next/components/shared/common/verified';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AdminMemberDataCell} from '@spinach/next/ui/admin/common/cell';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/popup/type';


export const AdminMemberBankDetailsPopup = ({member}: AdminMemberPopupProps) => {
  const t = useTranslations('UI.Account.BankAccounts');
  const t2 = useTranslations('UI.InPage.Admin.Members');

  return (
    <Flex center className="h-full">
      <UserDataLazyLoad
        options={{
          type: 'bankDetails',
          opts: {userId: member.id},
        }}
        loadingText={t('Account')}
        content={(lazyLoaded) => {
          const bankDetails = lazyLoaded?.bankDetails;

          if (!bankDetails || !bankDetails.length) {
            return t2('Message.NoAssociatedBanks');
          }

          return (
            <Flex className="gap-1.5 p-1">
              {bankDetails.map(({status, account, code, uuid}) => (
                <Flex key={uuid} className="info-section gap-1">
                  <VerificationStatusUi status={status}/>
                  <AdminMemberDataCell center={false} title={t('Code')} info={code}/>
                  <AdminMemberDataCell center={false} title={t('Account')} info={account}/>
                </Flex>
              ))}
            </Flex>
          );
        }}
      />
    </Flex>
  );
};

import React, {useState} from 'react';

import {accountIdVerificationType, AccountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminVerificationImageContent} from '@spinach/next/components/shared/admin/verification/popup/image/content';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {accountIdVerificationTypeI18nId} from '@spinach/next/const/account';
import {getToggleButtonClass} from '@spinach/next/styles/input';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/popup/type';


export const AdminMemberIdVerificationImagesPopup = ({member}: AdminMemberPopupProps) => {
  const t = useTranslations('UI.Account.IdType');
  const [selectedType, setSelectedType] = useState<AccountIdVerificationType | null>(null);

  return (
    <Flex className="gap-2">
      <Flex direction="row" wrap className="justify-center gap-2">
        {accountIdVerificationType.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={clsx('whitespace-nowrap p-2', getToggleButtonClass(selectedType === type))}
          >
            {t(accountIdVerificationTypeI18nId[type])}
          </button>
        ))}
      </Flex>
      {
        selectedType &&
        <Flex className="min-h-96 items-center justify-center rounded-lg border border-gray-300">
          <UserDataLazyLoad
            key={selectedType}
            loadingText="Loading..."
            options={{
              type: 'adminImageOfId',
              opts: {
                type: selectedType,
                userId: member.id,
              },
            }}
            content={(data) => (
              <AdminVerificationImageContent
                data={data?.adminImageOfId?.data}
                name={accountIdVerificationTypeI18nId[selectedType]}
              />
            )}
          />
        </Flex>
      }
    </Flex>
  );
};

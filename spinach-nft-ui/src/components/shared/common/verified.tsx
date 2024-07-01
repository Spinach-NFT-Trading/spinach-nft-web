import React from 'react';

import CheckBadgeIcon from '@heroicons/react/24/solid/CheckBadgeIcon';
import {VerificationStatus} from '@spinach/common/types/common/status';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {getVerificationStatusTextStyleMap, verificationStatusI18nId} from '@spinach/next/const/verification';


type Props = {
  status: VerificationStatus,
  isActive?: boolean,
};

export const VerificationStatusUi = ({status, isActive}: Props) => {
  const t = useTranslations('UI.VerificationStatus');

  const textStyleMap = getVerificationStatusTextStyleMap(isActive);

  return (
    <Flex direction="row" noFullWidth className={textStyleMap[status]}>
      <CheckBadgeIcon className="size-6"/>
      <div className="whitespace-nowrap">
        {t(verificationStatusI18nId[status])}
      </div>
    </Flex>
  );
};

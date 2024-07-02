import React from 'react';

import {smsVerificationExpiry, smsVerifiedExpiry} from '@spinach/common/const/smsVerify';
import {isApiError} from '@spinach/common/types/api/error';
import {useTranslations} from 'next-intl';

import {apiErrorI18nId} from '@spinach/next/hooks/i18n/apiError/const';


export const useI18nApiErrorTranslator = () => {
  const t = useTranslations('UI.Error.Api');

  return React.useCallback((error: string): string => {
    if (isApiError(error)) {
      return t(
        apiErrorI18nId[error],
        {
          smsVerificationExpiryMin: (smsVerificationExpiry / 60).toFixed(0),
          smsVerifiedExpiryMin: (smsVerifiedExpiry / 60).toFixed(0),
        },
      );
    }

    return error;
  }, []);
};

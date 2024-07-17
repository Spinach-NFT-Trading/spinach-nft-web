import React from 'react';

import {useTranslations} from 'next-intl';


export const AdminExchangeRequestsQueuedHeader = () => {
  const t = useTranslations('UI.InPage.Admin.ExchangeRequest.Header');

  return (
    <tr className="bg-slate-900/90">
      <td className="w-20">
        {t('Amount')}
      </td>
      <td className="w-40">
        {t('TimePassed')}
      </td>
      <td className="w-96">
        {t('SourceToken')}
      </td>
    </tr>
  );
};

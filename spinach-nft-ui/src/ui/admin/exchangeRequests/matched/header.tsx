import React from 'react';

import {useTranslations} from 'next-intl';


export const AdminExchangeRequestsMatchedHeader = () => {
  const t = useTranslations('UI.InPage.Admin.ExchangeRequest.Header');

  return (
    <tr className="bg-slate-900/90">
      <td className="w-96">
        {t('RequestId')}
      </td>
      <td className="w-40">
        {t('TimePassed')}
      </td>
      <td className="w-20">
        {t('AmountRequested')}
      </td>
      <td className="w-20">
        {t('AmountActual')}
      </td>
      <td className="w-20">
        {t('AmountToRefund')}
      </td>
      <td className="w-96">
        {t('SourceToken')}
      </td>
      <td className="w-96">
        {t('BankAccount')}
      </td>
    </tr>
  );
};

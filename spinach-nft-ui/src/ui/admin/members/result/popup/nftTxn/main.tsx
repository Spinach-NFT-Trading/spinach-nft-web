import React from 'react';

import {useTranslations} from 'next-intl';

import {AdminLookBackResultContent} from '@spinach/next/ui/admin/members/result/popup/common/content';
import {AdminLookBackResultLayout} from '@spinach/next/ui/admin/members/result/popup/common/layout';
import {AdminMemberNftTxnHeader} from '@spinach/next/ui/admin/members/result/popup/nftTxn/header';
import {AdminMemberNftTxnRow} from '@spinach/next/ui/admin/members/result/popup/nftTxn/row';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/popup/type';


export const AdminMemberNftTxnPopup = (props: AdminMemberPopupProps) => {
  const {member} = props;

  const t = useTranslations('UI.InPage.Admin.Members.Popup.NftTxn.Content');

  return (
    <AdminLookBackResultLayout
      requestType="adminMemberNftTxn"
      header={<AdminMemberNftTxnHeader/>}
      {...props}
    >
      {({status, lazyLoaded}) => {
        const response = lazyLoaded?.adminMemberNftTxn;

        return (
          <AdminLookBackResultContent
            data={response?.nftTxn}
            status={status}
            renderEntry={(txn) => (
              <AdminMemberNftTxnRow
                key={txn.id}
                member={member}
                userDataMap={response?.userDataMap ?? {}}
                txn={txn}
              />
            )}
            textOnLoading={t('Loading')}
            textOnNoResult={t('NoResult')}
          />
        );
      }}
    </AdminLookBackResultLayout>
  );
};

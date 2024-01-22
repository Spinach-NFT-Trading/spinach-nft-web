import React from 'react';

import {AdminLookBackResultContent} from '@spinach/next/ui/admin/members/result/single/popup/common/content';
import {AdminLookBackResultLayout} from '@spinach/next/ui/admin/members/result/single/popup/common/layout';
import {AdminMemberNftTxnHeader} from '@spinach/next/ui/admin/members/result/single/popup/nftTxn/header';
import {AdminMemberNftTxnRow} from '@spinach/next/ui/admin/members/result/single/popup/nftTxn/row';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/single/popup/type';


export const AdminMemberNftTxnPopup = (props: AdminMemberPopupProps) => {
  const {member} = props;

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
            textOnLoading="NFT 交易紀錄"
            textOnNoResult="無 NFT 交易紀錄"
          />
        );
      }}
    </AdminLookBackResultLayout>
  );
};

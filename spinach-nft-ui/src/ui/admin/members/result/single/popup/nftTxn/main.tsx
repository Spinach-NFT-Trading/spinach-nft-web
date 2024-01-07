import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AdminMemberNftTxnHeader} from '@spinach/next/ui/admin/members/result/single/popup/nftTxn/header';
import {AdminMemberNftTxnRow} from '@spinach/next/ui/admin/members/result/single/popup/nftTxn/row';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/single/popup/type';


export const AdminMemberNftTxnPopup = ({member}: AdminMemberPopupProps) => {
  return (
    <UserDataLazyLoad
      options={{
        type: 'adminMemberNftTxn',
        opts: {
          userId: member.id,
        },
      }}
      loadingText="NFT 交易紀錄"
      content={(data) => {
        const response = data?.adminMemberNftTxn;

        if (!response?.nftTxn.length) {
          return '無 NFT 交易紀錄';
        }

        const {nftTxn, userDataMap} = response;

        return (
          <Flex noFullWidth>
            <AdminMemberNftTxnHeader/>
            {nftTxn.map((txn) => (
              <AdminMemberNftTxnRow
                key={txn.id}
                member={member}
                userDataMap={userDataMap}
                txn={txn}
              />
            ))}
          </Flex>
        );
      }}
    />
  );
};

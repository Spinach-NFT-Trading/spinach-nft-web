'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AdminVerifyIdPending} from '@spinach/next/ui/admin/verify/id/pending';


export const AdminVerifyId = () => {
  return (
    <Flex className="gap-2">
      <div className="text-2xl">待驗證帳號</div>
      <UserDataLazyLoad
        options={{
          type: 'adminUnverifiedAccounts',
        }}
        loadingText="待驗證帳號"
        content={(data) => (
          <AdminVerifyIdPending initialUsers={data?.adminUnverifiedAccounts ?? []}/>
        )}
      />
    </Flex>
  );
};

'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AdminPendingVerification} from '@spinach/next/ui/admin/verify/id/pending/main';


export const AdminVerifyIdClient = () => {
  return (
    <Flex className="gap-2">
      <div className="text-2xl">待驗證帳號</div>
      <UserDataLazyLoad
        options={{
          type: 'adminUnverifiedAccounts',
        }}
        loadingText="待驗證帳號"
        content={(data) => (
          <AdminPendingVerification initialUsers={data?.adminUnverifiedAccounts ?? []}/>
        )}
      />
    </Flex>
  );
};

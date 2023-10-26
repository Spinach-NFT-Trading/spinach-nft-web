import React from 'react';

import Link from 'next/link';

import {Grid} from '@spinach/next/components/layout/grid';
import {AccountNftPosition} from '@spinach/next/ui/account/profile/position';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountIndex = () => {
  return (
    <ProfileLayout>
      <Grid className="gap-2 text-xl lg:grid-cols-2">
        <Link href="/account/register" className="button-clickable-bg w-full p-2 text-center">
          註冊
        </Link>
      </Grid>
    </ProfileLayout>
  );
};

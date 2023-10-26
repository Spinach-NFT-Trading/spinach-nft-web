import React from 'react';

import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {Grid} from '@spinach/next/components/layout/grid';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountIndex = () => {
  return (
    <ProfileLayout>
      <Grid className="gap-2 text-2xl lg:grid-cols-2">
        <FlexLink href="/account/profile" center className="button-clickable-bg p-5">
          會員資料
        </FlexLink>
        <FlexLink href="/account/position" center className="button-clickable-bg p-5">
          擁有 NFT
        </FlexLink>
      </Grid>
    </ProfileLayout>
  );
};

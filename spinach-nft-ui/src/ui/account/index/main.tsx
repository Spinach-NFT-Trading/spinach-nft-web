import React from 'react';

import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {Grid} from '@spinach/next/components/layout/grid';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountIndex = () => {
  return (
    <ProfileLayout>
      <Grid className="gap-2 text-xl lg:grid-cols-2">
        <FlexLink href="/account/register" className="button-clickable-bg w-full p-2 text-center">
          註冊
        </FlexLink>
      </Grid>
    </ProfileLayout>
  );
};

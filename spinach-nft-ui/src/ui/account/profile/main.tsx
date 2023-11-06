import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';

import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {Grid} from '@spinach/next/components/layout/grid';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountProfile = () => {
  return (
    <ProfileLayout>
      <Grid className="grid-cols-1 gap-2 text-3xl lg:grid-cols-2">
        <FlexLink href="/account/position" center className="button-clickable-bg h-36 gap-2">
          <MagnifyingGlassIcon className="h-9 w-9"/>
          NFT 持倉
        </FlexLink>
      </Grid>
    </ProfileLayout>
  );
};

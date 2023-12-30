import React from 'react';

import {Grid} from '@spinach/next/components/layout/grid';
import {TileLink} from '@spinach/next/components/shared/link';
import {adminLinks} from '@spinach/next/ui/admin/index/const';
import {AdminRequiredPageLayout} from '@spinach/next/ui/base/layout/adminRequired';


export const AdminIndex = () => {
  return (
    <AdminRequiredPageLayout>
      {({user}) => (
        <Grid className="gap-2 text-3xl lg:grid-cols-2">
          {adminLinks.map(({showsFor, ...props}) => {
            if (showsFor.admin && !user.isAdmin && showsFor.agent && !user.isAgent) {
              return null;
            }

            return <TileLink key={props.link} {...props}/>;
          })}
        </Grid>
      )}
    </AdminRequiredPageLayout>
  );
};

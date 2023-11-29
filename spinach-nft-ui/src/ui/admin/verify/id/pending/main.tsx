import React from 'react';

import {UserInfo} from '@spinach/common/types/common/user';

import {Grid} from '@spinach/next/components/layout/grid';
import {AdminPendingVerificationSingle} from '@spinach/next/ui/admin/verify/id/pending/single/main';


type Props = {
  initialUsers: UserInfo[],
};

export const AdminPendingVerification = ({initialUsers}: Props) => {
  const [users, setUsers] = React.useState(initialUsers);

  return (
    <Grid className="grid-cols-1 gap-2 xl:grid-cols-2 3xl:grid-cols-3">
      {users.map((user) => (
        <AdminPendingVerificationSingle
          key={user.id}
          user={user}
          onVerified={() => setUsers((original) => (
            original.filter(({id}) => id !== user.id)
          ))}
        />
      ))}
    </Grid>
  );
};

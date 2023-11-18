import React from 'react';

import {UserInfo} from '@spinach/common/types/common/user';

import {Grid} from '@spinach/next/components/layout/grid';
import {Popup} from '@spinach/next/components/popup';
import {AdminPendingVerificationPopup} from '@spinach/next/ui/admin/verify/id/pending/popup/main';
import {AdminPendingVerificationSingle} from '@spinach/next/ui/admin/verify/id/pending/single';
import {AdminPendingVerificationState} from '@spinach/next/ui/admin/verify/id/pending/type';


type Props = {
  users: UserInfo[],
};

export const AdminPendingVerification = ({users}: Props) => {
  const [state, setState] = React.useState<AdminPendingVerificationState>({
    show: false,
    user: null,
  });

  return (
    <Grid className="grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <Popup show={state.show} setShow={(show) => setState((original) => ({
        ...original,
        show,
      }))}>
        <AdminPendingVerificationPopup user={state.user}/>
      </Popup>
      {users.map((user) => (
        <AdminPendingVerificationSingle key={user.id} user={user} onClick={() => setState({
          show: true,
          user,
        })}/>
      ))}
    </Grid>
  );
};

import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {UserControlClient} from '@/ui/base/navbar/user/client';


export const UserControl = () => {
  const session = React.use(getServerSession(authOptions));

  return <UserControlClient session={session}/>;
};

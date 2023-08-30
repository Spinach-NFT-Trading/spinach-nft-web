import React from 'react';

import {signIn, signOut} from 'next-auth/react';

import {UserControlCommonProps} from '@spinach/next/ui/base/navbar/user/type';


export const UserAuthButton = ({session}: UserControlCommonProps) => {
  if (!session) {
    return (
      <button className="nav-button-text group border border-yellow-400 text-yellow-400" onClick={() => signIn()}>
        登入
      </button>
    );
  }

  return (
    <button className="nav-button-text group" onClick={() => signOut()}>
      登出
    </button>
  );
};

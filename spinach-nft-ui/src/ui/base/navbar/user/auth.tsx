import React from 'react';

import {signIn, signOut} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {UserControlCommonProps} from '@spinach/next/ui/base/navbar/user/type';


export const UserAuthButton = ({session}: UserControlCommonProps) => {
  const t = useTranslations('UI.UserControl');

  if (!session) {
    return (
      <button className="nav-button-text group border border-yellow-400 text-yellow-400" onClick={() => signIn()}>
        {t('Login')}
      </button>
    );
  }

  return (
    <button className="nav-button-text group" onClick={() => signOut()}>
      {t('Logout')}
    </button>
  );
};

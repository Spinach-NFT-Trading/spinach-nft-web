'use client';
import React from 'react';

import {signIn} from 'next-auth/react';


export const SignIn = () => {
  React.useEffect(() => {
    void signIn();
  }, []);

  return <></>;
};

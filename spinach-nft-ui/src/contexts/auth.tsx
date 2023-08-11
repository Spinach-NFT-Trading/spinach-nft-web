'use client';
import React from 'react';

import {SessionProvider} from 'next-auth/react';


export const AuthProvider = ({children}: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

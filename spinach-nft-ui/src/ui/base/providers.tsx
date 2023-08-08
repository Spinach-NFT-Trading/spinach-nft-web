'use client';
import React from 'react';

import {ThemeProvider} from 'next-themes';

import {LoadingFullScreen} from '@/components/icons/loading';
import {useMounted} from '@/hooks/mounted';


export const Providers = ({children}: React.PropsWithChildren) => {
  const {mounted} = useMounted();

  if (!mounted) {
    return (
      <LoadingFullScreen/>
    );
  }

  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  );
};

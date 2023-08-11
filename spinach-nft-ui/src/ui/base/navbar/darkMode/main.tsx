'use client';
import React from 'react';

import clsx from 'clsx';
import {useTheme} from 'next-themes';
import {DarkModeSwitch} from 'react-toggle-dark-mode';

import {useMounted} from '@/hooks/mounted';


export const ThemeSwitcher = () => {
  const {mounted} = useMounted();
  const {theme, setTheme} = useTheme();

  if (!mounted) {
    return null;
  }

  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? 'light' : 'dark');
  };

  return (
    <div className="button-clickable-bg nav-button group w-8">
      <DarkModeSwitch
        className={clsx(
          'h-full w-full',
          '[&>*]:fill-black [&>*]:stroke-black',
          '[&>*]:group-hover:fill-white [&>*]:group-hover:stroke-white',
          '[&>*]:dark:fill-white [&>*]:dark:stroke-white',
          '[&>*]:group-hover:dark:fill-black [&>*]:group-hover:dark:stroke-black',
        )}
        checked={theme === 'light'}
        onChange={toggleDarkMode}
        size={120}
      />
    </div>
  );
};

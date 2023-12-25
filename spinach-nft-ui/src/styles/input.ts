import clsx from 'clsx';


export const getToggleButtonClass = (isActive: boolean) => clsx(
  isActive ? 'button-toggle-active' : 'button-toggle-inactive',
);

import {clsx} from 'clsx';


export const tabbedContentStyle = {
  common: 'inline-block rounded-t-lg border-b-2 p-4',
  inactive: clsx(
    'transform-smooth border-transparent text-gray-300 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600',
  ),
  active: 'active border-blue-500 text-blue-500',
};

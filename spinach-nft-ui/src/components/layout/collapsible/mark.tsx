import React from 'react';

import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';


type Props = {
  show: boolean,
};

export const CollapsibleMark = ({show}: Props) => {
  return (
    <div className="absolute bottom-1 right-1 h-3.5 w-3.5">
      {show ? <ChevronUpIcon/> : <ChevronDownIcon/>}
    </div>
  );
};

'use client';
import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import ClipboardIcon from '@heroicons/react/24/outline/ClipboardIcon';


type Props = {
  data: string,
};

export const CopyButton = ({data}: Props) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2500);
    }
  }, [copied]);

  return (
    <button className="button-clickable relative size-8 p-1" onClick={() => {
      navigator.clipboard.writeText(data).then(() => setCopied(true));
    }}>
      {copied ? <CheckCircleIcon/> : <ClipboardIcon/>}
    </button>
  );
};

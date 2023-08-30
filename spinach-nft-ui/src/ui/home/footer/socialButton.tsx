import React from 'react';

import Link from 'next/link';


type Props = {
  href: string,
  text: string,
};

export const HomeSocialButton = ({href, text}: Props) => {
  return (
    <Link href={href} className="button-clickable w-32 border-2 border-slate-100 p-2 text-center">
      {text}
    </Link>
  );
};

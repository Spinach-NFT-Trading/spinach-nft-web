import React from 'react';

import {RouteDynamic} from '@spinach/next/types/next/route';


export const dynamic: RouteDynamic = 'force-dynamic';

const RootLayout = ({children}: React.PropsWithChildren) => {
  return children;
};

export default RootLayout;

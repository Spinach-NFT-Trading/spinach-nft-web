import React from 'react';


import BarsArrowDownIcon from '@heroicons/react/24/outline/BarsArrowDownIcon';
import BarsArrowUpIcon from '@heroicons/react/24/outline/BarsArrowUpIcon';

import {NftListingSortType} from '@spinach/next/components/shared/nft/type';


export const nftListingSortingIcon: {[sort in NftListingSortType]: React.ReactNode} = {
  asc: <BarsArrowUpIcon/>,
  desc: <BarsArrowDownIcon/>,
};

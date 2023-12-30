import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import IdentificationIcon from '@heroicons/react/24/outline/IdentificationIcon';

import {AdminLinkProps} from '@spinach/next/ui/admin/index/type';


export const adminLinks: AdminLinkProps[] = [
  {
    link: '/admin/members',
    text: '會員列表',
    icon: <IdentificationIcon/>,
    showsFor: {
      admin: true,
      agent: true,
    },
  },
  {
    link: '/admin/verify/id',
    text: '驗證身分',
    icon: <IdentificationIcon/>,
    showsFor: {
      admin: true,
      agent: false,
    },
  },
  {
    link: '/admin/verify/bank',
    text: '驗證銀行帳號',
    icon: <IdentificationIcon/>,
    showsFor: {
      admin: true,
      agent: false,
    },
  },
  {
    link: '/admin/verify/gold',
    text: '驗證轉帳紀錄',
    icon: <CurrencyDollarIcon/>,
    showsFor: {
      admin: true,
      agent: false,
    },
  },
];

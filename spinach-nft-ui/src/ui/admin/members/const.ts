import {AdminMembersFilterBasis} from '@spinach/next/ui/admin/members/type';


export const adminMembersSearchKeyName: {[key in AdminMembersFilterBasis]: string} = {
  idNumber: '身分證字號',
  username: '使用者 ID',
  name: '真實姓名',
  email: 'Email',
  lineId: 'LINE ID',
  wallet: '電子錢包',
};

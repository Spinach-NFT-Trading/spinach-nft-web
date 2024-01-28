import {AdminAgentsFilterBasis} from '@spinach/next/ui/admin/agents/type';


export const adminAgentsSearchKeyName: {[key in AdminAgentsFilterBasis]: string} = {
  idNumber: '身分證字號',
  username: '使用者 ID',
  name: '真實姓名',
};

import {AdminPageTab} from '@spinach/next/ui/admin/type';


export const adminTabsAdminOnly: {[tab in AdminPageTab]: boolean} = {
  agents: true,
  members: false,
  queuedExchangeRequests: true,
  verifyId: true,
  verifyBankAccount: true,
  verifyBankTxn: true,
  globalConfig: true,
};

export const adminDataRowHeight = 43;

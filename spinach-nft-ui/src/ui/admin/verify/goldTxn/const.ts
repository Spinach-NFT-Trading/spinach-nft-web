import {I18nMessageKeysOfNamespace} from '@spinach/next/types/i18n';
import {AdminVerifyGoldTxnFilterBasis} from '@spinach/next/ui/admin/verify/goldTxn/type';


export const adminVerifyGoldTxnSearchKeyName: {
  [key in AdminVerifyGoldTxnFilterBasis]: I18nMessageKeysOfNamespace<'UI.InPage.Admin.VerifyInfo'>
} = {
  username: 'Info.Username',
  name: 'Info.Name',
  bankAccount: 'Info.BankAccount',
};

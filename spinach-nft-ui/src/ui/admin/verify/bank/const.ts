import {I18nMessageKeysOfNamespace} from '@spinach/next/types/i18n';
import {AdminVerifyBankFilterBasis} from '@spinach/next/ui/admin/verify/bank/type';


export const adminVerifyBankSearchKeyI18nId: {
  [key in AdminVerifyBankFilterBasis]: I18nMessageKeysOfNamespace<'UI.InPage.Admin.VerifyInfo'>
} = {
  username: 'Info.Username',
  name: 'Info.Name',
  bankAccount: 'Info.BankAccount',
};

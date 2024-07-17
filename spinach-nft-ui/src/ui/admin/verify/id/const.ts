import {I18nMessageKeysOfNamespace} from '@spinach/next/types/i18n';
import {AdminVerifyIdFilterBasis} from '@spinach/next/ui/admin/verify/id/type';


export const adminVerifyIdSearchKeyI18nId: {
  [key in AdminVerifyIdFilterBasis]: I18nMessageKeysOfNamespace<'UI.InPage.Admin.VerifyInfo'>
} = {
  idNumber: 'Info.IdNumber',
  username: 'Info.Username',
  name: 'Info.Name',
};

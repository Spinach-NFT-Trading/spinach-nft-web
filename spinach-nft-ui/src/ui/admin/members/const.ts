import {I18nMessageKeysOfNamespace} from '@spinach/next/types/i18n';
import {AdminMembersFilterBasis} from '@spinach/next/ui/admin/members/type';


export const adminMembersSearchKeyI18nId: {
  [key in AdminMembersFilterBasis]: I18nMessageKeysOfNamespace<'UI.InPage.Admin.Members'>
} = {
  idNumber: 'Info.IdNumber',
  username: 'Info.Username',
  name: 'Info.Name',
  email: 'Info.Email',
  lineId: 'Info.LineId',
  wallet: 'Info.Wallet',
};

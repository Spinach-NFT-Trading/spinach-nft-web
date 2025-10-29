import {I18nMessageKeysOfNamespace} from '@spinach/next/types/i18n';
import {AdminVerifyLimitedNftFilterBasis} from '@spinach/next/ui/admin/verify/limitedNft/type';


export const adminVerifyLimitedNftSearchKeyName: {
  [key in AdminVerifyLimitedNftFilterBasis]: I18nMessageKeysOfNamespace<'UI.InPage.Admin.VerifyInfo'>
} = {
  username: 'Info.Username',
  name: 'Info.Name',
};

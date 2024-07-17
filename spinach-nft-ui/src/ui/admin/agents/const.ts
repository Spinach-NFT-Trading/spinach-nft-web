import {I18nMessageKeysOfNamespace} from '@spinach/next/types/i18n';
import {AdminAgentsFilterBasis} from '@spinach/next/ui/admin/agents/type';


export const adminAgentsSearchKeyName: {
  [key in AdminAgentsFilterBasis]: I18nMessageKeysOfNamespace<'UI.InPage.Admin.Agents.Search'>
} = {
  idNumber: 'IdNumber',
  username: 'Username',
  name: 'Name',
};

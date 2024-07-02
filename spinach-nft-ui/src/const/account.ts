import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';

import {I18nMessageKeysOfNamespace} from '@spinach/next/types/i18n';


export const accountIdVerificationTypeI18nId: {
  [type in AccountIdVerificationType]: I18nMessageKeysOfNamespace<'UI.Account.IdType'>
} = {
  idFront: 'IdFront',
  idBack: 'IdBack',
  handheld: 'Handheld',
  secondaryFront: 'SecondaryFront',
};

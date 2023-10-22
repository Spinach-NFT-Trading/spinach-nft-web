import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';


export type AccountRegisterIdVerificationType = 'idFront' | 'idBack' | 'handheld' | 'secondaryFront';

export type AccountRegisterIdVerificationState = {
  error: {[type in AccountIdVerificationType]: string | null},
};

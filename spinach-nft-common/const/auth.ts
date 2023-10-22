import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';


export const bankCodePattern = '[0-9]{3}';

export const bankAccountPattern = '\\w+';

export const usernamePattern = '[a-zA-Z0-9]{6,}';

export const passwordPattern = '.{6,}';

export const namePattern = '\\w+';

export const phonePattern = '09[0-9]{8}';

export const lineIdPattern = '[a-zA-Z0-9]+';

// TRC20 address
export const walletPattern = 'T[A-Za-z1-9]{33}';

export const accountIdVerificationTypeText: {[type in AccountIdVerificationType]: string} = {
  idFront: '身份證正面',
  idBack: '身份證反面',
  handheld: '手持身份證自拍',
  secondaryFront: '第二證件正面',
};

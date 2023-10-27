import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';


export const accountIdVerificationTypeText: {[type in AccountIdVerificationType]: string} = {
  idFront: '身份證正面',
  idBack: '身份證反面',
  handheld: '手持身份證自拍',
  secondaryFront: '第二證件正面',
};

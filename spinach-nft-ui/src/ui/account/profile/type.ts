import {UserInfo} from '@spinach/common/types/common/user';
import {UserBankDetails} from '@spinach/common/types/data/user/bank';


export type AccountProfileCommonProps = {
  userInfo: UserInfo,
  bankDetails: UserBankDetails[],
};

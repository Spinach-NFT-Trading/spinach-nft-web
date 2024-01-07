import {Nullable} from '@spinach/common/types/common/typing';
import {UserInfo} from '@spinach/common/types/common/user';
import {BankDetails} from '@spinach/common/types/data/user/bank';


export const formatUserName = (userInfo: Nullable<UserInfo>): string | null => {
  if (!userInfo) {
    return null;
  }

  const {username, name} = userInfo;

  return `${name} (@${username})`;
};

export const formatBankDetails = ({code, account}: Pick<BankDetails, 'code' | 'account'>) => `${code}-${account}`;

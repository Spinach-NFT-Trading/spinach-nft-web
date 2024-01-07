import {Nullable} from '@spinach/common/types/common/typing';
import {UserData} from '@spinach/common/types/common/user';
import {BankDetails} from '@spinach/common/types/data/user/bank';


export const formatUserName = (userInfo: Nullable<UserData>): string | null => {
  if (!userInfo) {
    return null;
  }

  const {username, name} = userInfo;

  return `${name} (@${username})`;
};

export const formatBankDetails = ({code, account}: Pick<BankDetails, 'code' | 'account'>) => `${code}-${account}`;

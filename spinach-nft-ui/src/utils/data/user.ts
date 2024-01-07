import {nftMinterAccountId} from '@spinach/common/const/nft';
import {Nullable} from '@spinach/common/types/common/typing';
import {UserData, UserDataMap} from '@spinach/common/types/common/user';
import {BankDetails} from '@spinach/common/types/data/user/bank';


export const formatUserName = (userInfo: Nullable<UserData>): string | null => {
  if (!userInfo) {
    return null;
  }

  const {username, name} = userInfo;

  return `${name} (@${username})`;
};

type FormatUserNameFromMapOpts = {
  userDataMap: UserDataMap,
  userId: string,
};

export const formatUserNameFromMap = ({userDataMap, userId}: FormatUserNameFromMapOpts): string | null => {
  if (userId === nftMinterAccountId) {
    return 'SYSTEM';
  }

  const userData = userDataMap[userId];

  return formatUserName(userData);
};

export const formatBankDetails = ({code, account}: Pick<BankDetails, 'code' | 'account'>) => `${code}-${account}`;

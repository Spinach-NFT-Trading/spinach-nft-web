import {userBankDetailsCollection} from '@spinach/common/controller/collections/user';

import {getDataAsArray} from '@spinach/next/controller/common';


export const getBankDetailsOfUser = (userId: string) => {
  return getDataAsArray(userBankDetailsCollection, {userId});
};

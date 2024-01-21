import {UserInfo} from '@spinach/common/types/common/user';

import {getUserInfoArray} from '@spinach/next/controller/user/info';
import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {throwIfNotAdminOrAgent} from '@spinach/next/controller/utils';


export type GetAccountMembersOpts = ControllerRequireUserIdOpts & {};

export const getAccountMembers = async ({executorUserId}: GetAccountMembersOpts): Promise<UserInfo[]> => {
  const user = await throwIfNotAdminOrAgent(executorUserId);

  if (user.isAdmin) {
    return getUserInfoArray({});
  }

  if (user.isAgent) {
    return getUserInfoArray({recruitedBy: executorUserId});
  }

  throw new Error(`Unhandled account members obtaining for user ${user._id.toHexString()}`);
};

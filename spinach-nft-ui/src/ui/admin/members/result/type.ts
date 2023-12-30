import {ApiErrorCode} from '@spinach/common/types/api/error';
import {UserInfo} from '@spinach/common/types/common/user';


export type AdminMembersResultState = {
  members: UserInfo[],
  error: ApiErrorCode | null,
};

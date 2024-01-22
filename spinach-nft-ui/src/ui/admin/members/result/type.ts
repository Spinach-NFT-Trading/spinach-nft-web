import {ApiErrorCode} from '@spinach/common/types/api/error';

import {ResponseOfAdminMemberList} from '@spinach/next/types/userData/lazyLoaded';


export type AdminMembersResultState = ResponseOfAdminMemberList & {
  error: ApiErrorCode | null,
};

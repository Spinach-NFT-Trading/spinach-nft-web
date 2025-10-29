import {UserInfo} from '@spinach/common/types/common/user/info';


export type AdminMemberSetRecruiterState = {
  search: string,
  searchResults: UserInfo[] | null,
  isLoading: boolean,
  recruiter: UserInfo | null,
};

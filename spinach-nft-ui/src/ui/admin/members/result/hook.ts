import {ResponseOfAdminMemberList} from '@spinach/next/types/userData/lazyLoaded';
import {AdminMembersFilterInput} from '@spinach/next/ui/admin/members/type';


type UseAdminMembersFilteredOpts = {
  memberInfo: ResponseOfAdminMemberList,
  input: AdminMembersFilterInput,
};

export const useAdminMembersFiltered = ({
  memberInfo,
  input,
}: UseAdminMembersFilteredOpts): ResponseOfAdminMemberList['members'] => {
  const {key, value} = input;
  const {members} = memberInfo;

  return members.filter((member) => (
    !value || member[key]?.includes(value)
  ));
};

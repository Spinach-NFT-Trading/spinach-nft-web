import React from 'react';

import {AdminMembersFilterInput} from '@spinach/next/ui/admin/members/type';


export type AdminMembersSearchInputProps = {
  input: AdminMembersFilterInput,
  setInput: React.Dispatch<React.SetStateAction<AdminMembersFilterInput>>,
};

import React from 'react';

import {Nullable} from '@spinach/common/types/common/typing';
import {UserInfo} from '@spinach/common/types/common/user/info';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {formatUserName} from '@spinach/next/utils/data/user';


type Props = {
  searchResults: Nullable<UserInfo[]>,
  onUserSelect: (user: UserInfo) => void,
};

export const AdminMemberSetRecruiterSearchResults = ({
  searchResults,
  onUserSelect,
}: Props) => {
  const t = useTranslations('UI.InPage.Admin.Members.Popup.SetRecruiter');

  if (searchResults == null) {
    return null;
  }

  if (searchResults.length === 0) {
    return t('NoResults');
  }

  return (
    <Flex className="gap-1">
      {searchResults.map((user) => (
        <button key={user.id} type="button" className="button-clickable-bg rounded-lg p-2" onClick={() => (
          onUserSelect(user)
        )}>
          {formatUserName(user)}
        </button>
      ))}
    </Flex>
  );
};

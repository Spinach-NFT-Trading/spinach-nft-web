import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import {getUserInfoById} from '@spinach/common/controller/user/info';
import {UserInfo} from '@spinach/common/types/common/user/info';
import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {InputBox} from '@spinach/next/components/shared/common/input/box';
import {searchAgentsByUsername} from '@spinach/next/controller/user/info';
import {updateUserRecruiter} from '@spinach/next/controller/user/update/recruiter';
import {
  AdminMemberSetRecruiterConfirmDialog,
} from '@spinach/next/ui/admin/members/result/popup/setRecruiter/confirmDialog';
import {
  AdminMemberSetRecruiterSearchResults,
} from '@spinach/next/ui/admin/members/result/popup/setRecruiter/searchResults';
import {AdminMemberSetRecruiterState} from '@spinach/next/ui/admin/members/result/popup/setRecruiter/type';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/popup/type';
import {formatUserName} from '@spinach/next/utils/data/user';


export const AdminMemberSetRecruiterPopup = ({member, setShow, refetch}: AdminMemberPopupProps) => {
  const {data: session} = useSession();
  const t = useTranslations('UI.InPage.Admin.Members.Popup.SetRecruiter');

  const [state, setState] = React.useState<AdminMemberSetRecruiterState>({
    search: '',
    searchResults: null,
    isLoading: false,
    recruiter: null,
  });
  const [confirmingUser, setConfirmingUser] = React.useState<UserInfo | null>(null);

  React.useEffect(() => {
    const executorUserId = session?.user?.id;
    if (executorUserId == null) {
      return;
    }

    getUserInfoById({
      executorUserId,
      requiresElevated: true,
      userId: member.recruitedBy,
    }).then((maybeRecruiterInfo) => setState((original) => ({
      ...original,
      recruiter: maybeRecruiterInfo,
    })));
  }, []);

  if (state.recruiter == null) {
    return null;
  }

  return (
    <>
      <AdminMemberSetRecruiterConfirmDialog
        user={confirmingUser}
        isLoading={state.isLoading}
        onConfirm={async () => {
          if (!confirmingUser || !session?.user?.id) {
            return;
          }

          setState((original) => ({...original, isLoading: true}));
          try {
            await updateUserRecruiter({
              executorUserId: session.user.id,
              targetId: member.id,
              recruiterId: confirmingUser.id,
            });

            setConfirmingUser(null);
            setShow(false);
            refetch();
          } finally {
            setState((original) => ({...original, isLoading: false}));
          }
        }}
        onCancel={() => setConfirmingUser(null)}
      />
      <Flex className="gap-2 p-2">
        <Flex direction="row" center className="gap-2">
          <span>{t('CurrentRecruiter')}</span>
          <span>{formatUserName(state.recruiter) ?? 'N/A'}</span>
        </Flex>
        <FlexForm direction="row" className="items-center gap-2" onSubmit={async () => {
          if (!session?.user?.id) {
            return;
          }

          setState((original) => ({...original, isLoading: true}));
          try {
            const searchResults = await searchAgentsByUsername({
              selfUserId: member.id,
              executorUserId: session.user.id,
              usernamePattern: state.search,
            });
            setState((original) => ({...original, searchResults}));
          } finally {
            setState((original) => ({...original, isLoading: false}));
          }
        }}>
          <InputBox
            value={state.search}
            type="text"
            onChange={({target}) => setState((original) => ({...original, search: target.value}))}
            placeholder={t('SearchUsername')}
            className="w-full"
          />
          <button type="submit" className="button-clickable-bg rounded-lg p-1">
            <MagnifyingGlassIcon className="size-5"/>
          </button>
        </FlexForm>
        <AdminMemberSetRecruiterSearchResults
          searchResults={state.searchResults}
          onUserSelect={setConfirmingUser}
        />
      </Flex>
    </>
  );
};

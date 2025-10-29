import React from 'react';

import {UserInfo} from '@spinach/common/types/common/user/info';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {formatUserName} from '@spinach/next/utils/data/user';


type Props = {
  user: UserInfo | null,
  isLoading: boolean,
  onConfirm: () => Promise<void>,
  onCancel: () => void,
};

export const AdminMemberSetRecruiterConfirmDialog = ({
  user,
  isLoading,
  onConfirm,
  onCancel,
}: Props) => {
  const t = useTranslations('UI.InPage.Admin.Members.Popup.SetRecruiter');

  return (
    <Popup show={user !== null} setShow={(show) => !show && onCancel()}>
      <Flex className="gap-2 p-2">
        <div>
          {t.rich(
            'ConfirmMessage',
            {
              username: () => <span className="text-lg font-semibold">{formatUserName(user)}</span>,
            },
          )}
        </div>
        <button
          type="button"
          className="button-base button-text-hover h-14 bg-green-700/30 text-2xl hover:bg-green-300"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {t('Confirm')}
        </button>
        <button
          type="button"
          className="button-clickable-bg h-14 rounded-lg p-2"
          onClick={onCancel}
        >
          {t('Cancel')}
        </button>
      </Flex>
    </Popup>
  );
};

import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {CommonUserData} from '@spinach/next/types/auth';
import {AdminMemberPopupContent} from '@spinach/next/ui/admin/members/result/popup/content';
import {AdminMemberPopupState} from '@spinach/next/ui/admin/members/result/popup/type';


type Props = {
  user: CommonUserData,
  state: AdminMemberPopupState,
  setShow: (show: boolean) => void,
};

export const AdminMemberPopup = ({user, state, setShow}: Props) => {
  const {show, member} = state;

  return (
    <Popup show={show} setShow={setShow}>
      <Flex noFullWidth className="max-h-[70vh]">
        {member && <AdminMemberPopupContent {...state} actor={user} member={member} setShow={setShow}/>}
      </Flex>
    </Popup>
  );
};

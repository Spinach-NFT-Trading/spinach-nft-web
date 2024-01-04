import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {AdminMemberPopupContent} from '@spinach/next/ui/admin/members/result/single/popup/content';
import {AdminMemberPopupContentProps} from '@spinach/next/ui/admin/members/result/single/popup/type';


type Props = AdminMemberPopupContentProps & {
  show: boolean,
  setShow: (show: boolean) => void,
};

export const AdminMemberPopup = ({show, setShow, ...props}: Props) => {
  return (
    <Popup show={show} setShow={setShow}>
      <Flex className="w-[70vw]">
        <AdminMemberPopupContent {...props}/>
      </Flex>
    </Popup>
  );
};

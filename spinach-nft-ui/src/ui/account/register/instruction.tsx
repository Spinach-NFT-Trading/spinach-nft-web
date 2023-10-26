import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {NextImage} from '@spinach/next/components/shared/common/image/main';


export const AccountRegisterInstruction = () => {
  return (
    <Flex center className="justify-between gap-3">
      <div className="relative h-72 w-72">
        <NextImage src="/line-qr.png" alt="LINE"/>
      </div>
      <div className="text-left">
        註冊步驟:
        <ol className="list-inside list-decimal">
          <li>資料填寫完整並提交。</li>
          <li>提交後請添加官方客服實名認證。</li>
        </ol>
      </div>
      <FlexLink href="#" className="button-clickable-bg w-full p-2">
        前往實名驗證
      </FlexLink>
    </Flex>
  );
};

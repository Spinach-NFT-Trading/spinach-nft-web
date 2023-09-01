import React from 'react';

import Link from 'next/link';

import {Flex} from '@spinach/next/components/layout/flex';
import {NextImage} from '@spinach/next/components/shared/common/image';


export const AccountRegisterInstruction = () => {
  return (
    <Flex direction="col" center className="justify-between gap-3">
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
      <Link href="#" className="button-clickable-bg w-full p-2">
        前往實名驗證
      </Link>
    </Flex>
  );
};

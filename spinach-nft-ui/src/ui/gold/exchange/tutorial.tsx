import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';


export const GoldExchangeCryptoTutorial = () => {
  return (
    <Flex center className="info-section gap-2">
      <a href="https://youtu.be/bkCavlothfY" target="_blank" className="text-link">
        創建 MAX 帳號影片教學請點我
      </a>
      <a href="https://youtu.be/R5qtrq4n_fQ" target="_blank" className="text-link">
        購買 USDT 的影片教學請點我
      </a>
      <a href="https://youtu.be/sydHSLaSDS8" target="_blank" className="text-link">
        查詢 USDT (TRC20) 錢包地址的影片教學請點我
      </a>
    </Flex>
  );
};

import React from 'react';

import {Session} from 'next-auth';
import {signIn} from 'next-auth/react';

import {Flex} from '@spinach/next/components/layout/flex';
import {Popup} from '@spinach/next/components/popup';
import {ExchangeAmount} from '@spinach/next/ui/gold/exchange/type';


type Props = {
  session: Session | null,
  show: boolean,
  setShow: (show: boolean) => void,
  amount: ExchangeAmount,
};

export const GoldExchangeConfirmPopup = ({session, amount, show, setShow}: Props) => {
  const onClick = async () => {
    if (!session) {
      await signIn();
      return;
    }
  };

  return (
    <Popup show={show} setShow={setShow}>
      <Flex direction="col" center className="gap-2">
        <div className="text-xl">
          確認購買
        </div>
        <hr className="w-full"/>
        <div>
          確定要購買 {amount.gold} GOLD 嗎？
        </div>
        <button className="button-clickable-bg w-1/2 p-2" onClick={onClick}>
          確認
        </button>
      </Flex>
    </Popup>
  );
};

import React from 'react';

import {translateApiError} from '@spinach/common/utils/translate/apiError';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';

import {Flex} from '@spinach/next/components/layout/flex';
import {Popup} from '@spinach/next/components/popup';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {ExchangeAmount} from '@spinach/next/ui/gold/exchange/type';


type Props = {
  show: boolean,
  setShow: (show: boolean) => void,
  amount: ExchangeAmount,
};

export const GoldExchangeConfirmPopup = ({amount, show, setShow}: Props) => {
  const [error, setError] = React.useState<string | null>(null);
  const {act} = useUserDataActor();
  const {push} = useRouter();

  const onClick = async () => {
    if (!act) {
      await signIn();
      return;
    }

    const session = await act({action: 'request', options: {type: 'exchangeGold', data: null}});
    const error = session?.user.jwtUpdateError;
    if (!error) {
      push(`/gold/confirm?${new URLSearchParams({amount: amount.usdt.toString()})}`);
      return;
    }
    setError(error);
  };

  return (
    <Popup show={show} setShow={setShow}>
      <Flex direction="col" center className="gap-2">
        {error && <Alert>{translateApiError(error)}</Alert>}
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

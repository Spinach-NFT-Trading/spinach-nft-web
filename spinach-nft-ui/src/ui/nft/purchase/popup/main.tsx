import React from 'react';

import {ApiErrorCode} from '@spinach/common/types/api/error';
import {translateApiError} from '@spinach/common/utils/translate/apiError';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {NftPurchaseConfirmDisclaimer} from '@spinach/next/ui/nft/purchase/popup/disclaimer';


type Props = {
  nftId: string,
  show: boolean,
  setShow: (show: boolean) => void,
};

export const NftPurchaseConfirmPopup = ({nftId, show, setShow}: Props) => {
  const [error, setError] = React.useState<ApiErrorCode | null>(null);
  const {act, status} = useUserDataActor();
  const {replace} = useRouter();

  if (!act) {
    return <SignIn/>;
  }

  const onClick = async () => {
    if (!act) {
      await signIn();
      return;
    }

    const session = await act({
      action: 'request',
      options: {
        type: 'nft.buy',
        data: {nftId},
      },
    });
    const error = session?.user.jwtUpdateError;
    if (error) {
      setError(error);
      return;
    }

    replace('/account/position');
  };

  return (
    <Popup show={show} setShow={setShow}>
      <Flex center className="gap-2">
        {error && <Alert>{translateApiError(error)}</Alert>}
        <div className="text-xl">
          確認購買
        </div>
        <hr className="w-full"/>
        <div>
          確定要購買此 NFT 嗎？
        </div>
        <NftPurchaseConfirmDisclaimer/>
        <button
          className="button-clickable-bg w-1/2 p-2"
          disabled={status === 'processing' || status === 'failed'}
          onClick={onClick}
        >
          確認購買
        </button>
      </Flex>
    </Popup>
  );
};

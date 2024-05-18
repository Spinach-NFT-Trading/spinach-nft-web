import React from 'react';

import {ObjectId} from 'mongodb';
import {getServerSession} from 'next-auth';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {authOptions} from '@spinach/next/const/auth';
import {getNftInfoMap} from '@spinach/next/controller/nft/info';
import {getMatchedNftExchangeRequests} from '@spinach/next/controller/nft/request/match';
import {AccountNftExchangeConfirmClient} from '@spinach/next/ui/account/nft/exchange/client';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountNftExchangeConfirm = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <SignIn/>;
  }

  const matchedExchangeRequests = await getMatchedNftExchangeRequests({
    executorUserId: session?.user.id,
  });
  const nftInfoMap = await getNftInfoMap(matchedExchangeRequests.map(({nftId}) => new ObjectId(nftId)));

  return (
    <ProfileLayout>
      <AccountNftExchangeConfirmClient
        initialMatchedExchangeRequests={matchedExchangeRequests}
        nftInfoMap={nftInfoMap}
      />
    </ProfileLayout>
  );
};

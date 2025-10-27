import React from 'react';

import {toObject} from '@spinach/common/utils/object/make';
import {ObjectId} from 'mongodb';
import {getServerSession} from 'next-auth';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {authOptions} from '@spinach/next/const/auth';
import {getNftInfoMap} from '@spinach/next/controller/nft/info';
import {
  getNftLimitedUnverifiedClient,
  getNftLimitedPendingClient,
} from '@spinach/next/controller/nft/limited';
import {getNftListingData} from '@spinach/next/controller/nft/listing';
import {NftPositionLimitedClient} from '@spinach/next/ui/account/nft/position/limitedIndex/client';
import {NftPositionLimitedProvider} from '@spinach/next/ui/account/nft/position/limitedIndex/context/main';
import {NftPositionLimitedData} from '@spinach/next/ui/account/nft/position/limitedIndex/type';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const NftPositionLimitedPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <SignIn/>;
  }

  const userId = new ObjectId(session.user.id);
  const [unverified, pending] = await Promise.all([
    getNftLimitedUnverifiedClient(userId),
    getNftLimitedPendingClient(userId),
  ]);

  const nftIds = [
    ...unverified.map((item) => new ObjectId(item.nftId)),
    ...pending.map((item) => new ObjectId(item.nftId)),
  ];

  const nftInfoMap = await getNftInfoMap(nftIds);
  const nftListingData = await getNftListingData(nftIds, nftInfoMap);

  const data: NftPositionLimitedData = {
    unverified,
    pending,
    nftListingMap: toObject(nftListingData, (listing) => [listing.id, listing]),
  };

  return (
    <ProfileLayout>
      <I18nProvider>
        <NftPositionLimitedProvider data={data}>
          <NftPositionLimitedClient/>
        </NftPositionLimitedProvider>
      </I18nProvider>
    </ProfileLayout>
  );
};

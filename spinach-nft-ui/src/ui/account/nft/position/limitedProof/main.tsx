import React from 'react';

import {generateFileUploadGrant} from '@spinach/common/controller/actors/fileUpload';
import {
  nftLimitedUnverifiedCollection,
  nftLimitedPendingCollection,
} from '@spinach/common/controller/collections/nft';
import {ObjectId} from 'mongodb';
import {getServerSession} from 'next-auth';
import {getTranslations} from 'next-intl/server';

import {
  NftPositionLimitedProofPageParams,
} from '@spinach/next/app/[locale]/account/nft/position/limited/proof/[nftId]/page';
import {SignIn} from '@spinach/next/components/auth/signIn';
import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {Failed} from '@spinach/next/components/icons/failed';
import {authOptions} from '@spinach/next/const/auth';
import {getNftInfoMap} from '@spinach/next/controller/nft/info';
import {getNftListingData} from '@spinach/next/controller/nft/listing';
import {NextPageProps} from '@spinach/next/types/next/page';
import {NftPositionLimitedProofClient} from '@spinach/next/ui/account/nft/position/limitedProof/client';
import {LoginRequiredPageLayout} from '@spinach/next/ui/base/layout/loginRequired';


export const NftPositionLimitedProofPage = async ({params}: NextPageProps<NftPositionLimitedProofPageParams>) => {
  const {nftId} = params;
  const t = await getTranslations('UI.InPage.NftPosition.LimitedProof.Error');

  if (!ObjectId.isValid(nftId)) {
    return <Failed text={t('InvalidNftId')}/>;
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return <SignIn/>;
  }

  const nftObjectId = new ObjectId(nftId);
  const buyerId = new ObjectId(session.user.id);

  const unverified = await nftLimitedUnverifiedCollection.findOne({
    nftId: nftObjectId,
    buyer: buyerId,
  });
  if (!unverified) {
    // Check if already submitted to pending collection
    const pending = await nftLimitedPendingCollection.findOne({
      nftId: nftObjectId,
      buyer: buyerId,
    });
    return <Failed text={pending ? t('AlreadySubmitted') : t('InvalidNftId')}/>;
  }

  const fileUploadGrantId = await generateFileUploadGrant();

  const nftInfoMap = await getNftInfoMap([nftObjectId]);
  const nftListingData = await getNftListingData([nftObjectId], nftInfoMap);
  const nftListing = nftListingData.at(0) ?? null;
  if (!nftListing) {
    return <Failed text={t('InvalidNftId')}/>;
  }

  return (
    <LoginRequiredPageLayout>
      <I18nProvider>
        <NftPositionLimitedProofClient
          fileUploadGrantId={fileUploadGrantId}
          nftListing={nftListing}
        />
      </I18nProvider>
    </LoginRequiredPageLayout>
  );
};

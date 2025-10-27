'use client';
import React from 'react';

import {useSession} from 'next-auth/react';
import {signIn} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {submitLimitedNftPurchaseProof} from '@spinach/next/controller/nft/limited';
import {useI18nApiErrorTranslator} from '@spinach/next/hooks/i18n/apiError/main';
import {FileRef} from '@spinach/next/types/input/fileRef';
import {NftListingData} from '@spinach/next/types/nft';
import {NftPositionLimitedProofContext} from '@spinach/next/ui/account/nft/position/limitedProof/context/const';
import {uploadFile} from '@spinach/next/utils/api/fileUpload';


type Props = {
  fileUploadGrantId: string,
  nftListing: NftListingData,
};

export const NftPositionLimitedProofProvider = ({
  fileUploadGrantId,
  nftListing,
  children,
}: React.PropsWithChildren<Props>) => {
  const session = useSession();
  const [transferProofImageFileRef, setTransferProofImageFileRef] = React.useState<FileRef | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [uploadCompleted, setUploadCompleted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const t = useTranslations('UI.InPage.NftPosition.LimitedProof');
  const tApiError = useI18nApiErrorTranslator();

  const handleSubmit = async () => {
    if (!session.data) {
      await signIn();
      return;
    }

    if (!transferProofImageFileRef) {
      setErrorMessage(t('Error.NoProof'));
      return;
    }

    setIsSubmitting(true);

    const uploadResponse = await uploadFile({
      fileRef: transferProofImageFileRef,
      grantId: fileUploadGrantId,
    });
    if (!uploadResponse.success) {
      setErrorMessage(tApiError(uploadResponse.error));
      setIsSubmitting(false);
      return;
    }

    const submitError = await submitLimitedNftPurchaseProof({
      executorUserId: session.data.user.id,
      nftId: nftListing.id,
      proofUploadId: uploadResponse.data.uploadId,
    });
    if (submitError) {
      setErrorMessage(tApiError(submitError));
      setIsSubmitting(false);
      return;
    }

    setUploadCompleted(true);
    setErrorMessage(null);
    setIsSubmitting(false);

    setTimeout(() => {
      // Redirect back to limited position page after a delay
      window.location.href = '/account/nft/position/limited';
    }, 2000);
  };

  return (
    <NftPositionLimitedProofContext.Provider value={{
      nftListing,
      transferProofImageFileRef,
      errorMessage,
      uploadCompleted,
      isSubmitting,
      setTransferProofImageFileRef,
      setErrorMessage,
      handleSubmit,
    }}>
      {children}
    </NftPositionLimitedProofContext.Provider>
  );
};

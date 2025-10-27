import React from 'react';

import {useTranslations} from 'next-intl';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {InputFileImageOnly} from '@spinach/next/components/shared/common/input/file/image';
import {CopyButton} from '@spinach/next/components/shared/copy';
import {NftListingSingle} from '@spinach/next/components/shared/nft/single';
import {useNftPositionLimitedProofContext} from '@spinach/next/ui/account/nft/position/limitedProof/context/hook';


export const NftPositionLimitedProofForm = () => {
  const {
    nftListing,
    transferProofImageFileRef,
    errorMessage,
    isSubmitting,
    setTransferProofImageFileRef,
    setErrorMessage,
    handleSubmit,
  } = useNftPositionLimitedProofContext();

  const t = useTranslations('UI.InPage.NftPosition.LimitedProof');

  const {bankAccount} = nftListing;
  if (!bankAccount) {
    return null;
  }

  return (
    <Flex center className="gap-2 p-4 text-start">
      <h2 className="text-xl font-semibold">{t('Title')}</h2>
      <FlexForm noFullWidth onSubmit={handleSubmit} className="w-read gap-2">
        {errorMessage && <Alert>{errorMessage}</Alert>}
        <NftListingSingle nft={nftListing} isOnSale={false}/>
        <Flex className="gap-1">
          <div className="text-sm text-gray-400">
            {t('BankAccount')}
          </div>
          <Flex direction="row" center>
            <pre className="overflow-y-auto text-lg">
              {bankAccount}
            </pre>
            <CopyButton data={bankAccount}/>
          </Flex>
        </Flex>
        <InputFileImageOnly
          id="transfer-proof"
          title={t('ChooseImage')}
          onFileSelected={(fileRef) => {
            setTransferProofImageFileRef(fileRef);
            setErrorMessage(null);
          }}
          onFileTypeIncorrect={(fileType) => {
            setErrorMessage(`${t('Error.InvalidFileType')}: ${fileType}`);
          }}
          required
          className='text-start'
        />
        <FlexButton
          isSubmit
          center
          disabled={isSubmitting || !transferProofImageFileRef}
          className="button-clickable-bg disabled:button-disabled p-2"
        >
          {isSubmitting ? t('Submitting') : t('Submit')}
        </FlexButton>
        <FlexButton center className="button-clickable-bg-warn p-2" onClick={() => {
          window.location.href = '/account/nft/position/limited';
        }}>
          {t('Cancel')}
        </FlexButton>
      </FlexForm>
    </Flex>
  );
};

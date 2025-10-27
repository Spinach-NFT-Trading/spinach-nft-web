import {FileRef} from '@spinach/next/types/input/fileRef';
import {NftListingData} from '@spinach/next/types/nft';


export type NftPositionLimitedProofContextContent = {
  nftListing: NftListingData,
  transferProofImageFileRef: FileRef | null,
  errorMessage: string | null,
  uploadCompleted: boolean,
  isSubmitting: boolean,
  setTransferProofImageFileRef: (fileRef: FileRef | null) => void,
  setErrorMessage: (message: string | null) => void,
  handleSubmit: () => Promise<void>,
};

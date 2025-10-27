import {GenerateMetadataParams} from '@spinach/next/types/next/metadata';
import {NftPositionLimitedProofPage} from '@spinach/next/ui/account/nft/position/limitedProof/main';
import {generatePageMeta} from '@spinach/next/utils/website/meta/main';


export type NftPositionLimitedProofPageParams = GenerateMetadataParams & {
  nftId: string,
};

export const generateMetadata = generatePageMeta({key: 'Account.Nft.Position.Limited.Title'});

export default NftPositionLimitedProofPage;

import {GenerateMetadata, GenerateMetadataParams} from '@spinach/next/types/next/metadata';
import {NftPurchase} from '@spinach/next/ui/nft/purchase/main';
import {generatePageMeta} from '@spinach/next/utils/website/meta/main';


export type NftPurchasePageParams = GenerateMetadataParams & {
  id: string,
};

export const generateMetadata: GenerateMetadata<NftPurchasePageParams> = async ({params}) => {
  const {id} = await params;

  return generatePageMeta({key: 'Nft.Purchase.Title', values: {id}})({params});
};

export default NftPurchase;

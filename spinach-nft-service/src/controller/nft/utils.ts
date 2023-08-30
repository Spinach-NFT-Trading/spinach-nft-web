import {NftInfoModel} from '@spinach/common/types/data/nft';

import {getNewSeqId} from '@spinach/service/controller/nft/main';


const staticImageUrls = [
  'https://i.imgur.com/4LeEK8H.jpeg',
  'https://i.imgur.com/9b1zecp.jpeg',
  'https://i.imgur.com/c7MhIvG.jpeg',
  'https://i.imgur.com/hFu6xni.jpeg',
  'https://i.imgur.com/rgcSUK7.jpeg',
];

export const generateNft = async (): Promise<NftInfoModel> => {
  const seqId = await getNewSeqId();
  const imageIdx = Math.floor(Math.random() * 100000 % staticImageUrls.length);

  return {seqId, image: staticImageUrls[imageIdx]};
};

export const generateSalePrice = () => {
  return 10000;
};

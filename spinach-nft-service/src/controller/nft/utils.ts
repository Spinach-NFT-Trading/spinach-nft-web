import {faker} from '@faker-js/faker';
import {NftInfoModel} from '@spinach/common/types/data/nft';

import {getNewSeqId, getRandomNftImage} from '@spinach/service/controller/nft/main';


export const generateNft = async (): Promise<NftInfoModel> => {
  const [
    seqId,
    image,
  ] = await Promise.all([
    getNewSeqId(),
    getRandomNftImage(),
  ]);
  const isLimited = Math.random() < 0.5;

  return {
    seqId,
    tokenId: parseInt((Math.random() * 10000).toString()),
    maker: `${faker.person.firstName()} ${faker.person.lastName()}`,
    image,
    isLimited,
  };
};

export const generateSalePrice = () => {
  return 10000;
};

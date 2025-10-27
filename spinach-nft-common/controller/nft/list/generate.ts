import {faker} from '@faker-js/faker';

import {nftImageCollection, nftInfoCollection} from '@spinach/common/controller/collections/nft';
import {NftImageModel, NftInfoLimitedMeta, NftInfoModel} from '@spinach/common/types/data/nft';


const getNewSeqId = async () => {
  const newest = await nftInfoCollection.findOne({}, {sort: {seqId: 'desc'}});

  if (!newest) {
    return 773001;
  }

  return newest.seqId + 1;
};

const getRandomNftImage = async () => {
  return (await nftImageCollection.aggregate<NftImageModel>([{$sample: {size: 1}}]).toArray())[0].url;
};

export const generateNft = async (limitedMeta: NftInfoLimitedMeta): Promise<NftInfoModel> => {
  const [
    seqId,
    image,
  ] = await Promise.all([
    getNewSeqId(),
    getRandomNftImage(),
  ]);

  return {
    seqId,
    tokenId: parseInt((Math.random() * 10000).toString()),
    maker: `${faker.person.firstName()} ${faker.person.lastName()}`,
    image,
    ...limitedMeta,
  };
};

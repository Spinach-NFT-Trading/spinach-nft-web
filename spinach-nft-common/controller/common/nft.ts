import {nftOnSaleCollection} from '@spinach/common/controller/collections/nft';


export const getOnSaleNftCount = () => nftOnSaleCollection.countDocuments({});

import {ObjectId} from 'mongodb';

import {OverwriteValueType} from '@spinach/common/types/common/typing';


export type NftLimitedUnverifiedModel = {
  uuid: string,
  nftId: ObjectId,
  nftTxnId: ObjectId,
  buyer: ObjectId,
};

export type NftLimitedUnverifiedModelClient = OverwriteValueType<NftLimitedUnverifiedModel, ObjectId, string>;

export type NftLimitedPendingModel = NftLimitedUnverifiedModel & {
  proofUploadId: string,
};

export type NftLimitedPendingModelClient = OverwriteValueType<NftLimitedPendingModel, ObjectId, string>;

import {ObjectId} from 'mongodb';


export type NftExchangeToken = {
  token: string,
  webhook: string,
  note?: string,
};

export type NftExchangeTokenModel = NftExchangeToken & {
  accountId: ObjectId,
};

export type NftExchangeTokenMap = {[token in string]?: NftExchangeToken};

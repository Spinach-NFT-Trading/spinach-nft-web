import {NftPriceTierModel} from '@spinach/common/types/data/nft';


// Must be a valid ObjectId
// > Not directly storing `ObjectId` because `ObjectId` is only server side, but this ID might be used client side
export const nftMinterAccountId: string = '00000000becabf146d2b9306';

export const defaultNftPriceTiers: NftPriceTierModel[] = [
  {quantity: 1, price: 1000},
  {quantity: 1, price: 2000},
  {quantity: 1, price: 3000},
  {quantity: 1, price: 4000},
  {quantity: 1, price: 5000},
  {quantity: 1, price: 6000},
  {quantity: 1, price: 7000},
  {quantity: 1, price: 8000},
  {quantity: 1, price: 9000},
  {quantity: 1, price: 10000},
  {quantity: 1, price: 15000},
  {quantity: 1, price: 20000},
  {quantity: 1, price: 25000},
  {quantity: 1, price: 30000},
  {quantity: 1, price: 35000},
  {quantity: 1, price: 40000},
  {quantity: 1, price: 45000},
  {quantity: 1, price: 50000},
];

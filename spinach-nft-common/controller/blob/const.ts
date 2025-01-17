import {BlobServiceClient} from '@azure/storage-blob';

import {azureBlobConnectionString} from '@spinach/common/env';


export const azureBlobClient = azureBlobConnectionString ?
  BlobServiceClient.fromConnectionString(azureBlobConnectionString) :
  null;

export const azureContainer = {
  bankDetails: 'bankDetails',
  goldPurchase: {
    twBank: 'goldPurchaseTwBank',
  },
};

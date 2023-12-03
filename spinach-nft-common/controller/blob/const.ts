import {BlobServiceClient} from '@azure/storage-blob';

import {azureBlobConnectionString} from '@spinach/common/env';


export const azureBlobClient = BlobServiceClient.fromConnectionString(azureBlobConnectionString);

export const azureContainer = {
  bankDetails: 'bankDetails',
};

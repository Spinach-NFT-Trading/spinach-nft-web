import {azureBlobClient} from '@spinach/common/controller/blob/const';
import {AzureBlobControlOpts} from '@spinach/common/controller/blob/type';
import {enforceAzureBlobNaming} from '@spinach/common/controller/blob/utils';


export const getBlobClient = async (opts: AzureBlobControlOpts) => {
  const enforcedOpts = enforceAzureBlobNaming(opts);
  const {container, name} = enforcedOpts;

  if (!azureBlobClient) {
    throw new Error(
      'Azure Blob client not initialized. Need to set `AZURE_BLOB_URI` as environment variable.',
    );
  }

  const containerClient = azureBlobClient.getContainerClient(container.toLowerCase());
  await containerClient.createIfNotExists();

  return {
    ...enforcedOpts,
    client: containerClient.getBlockBlobClient(name),
  };
};

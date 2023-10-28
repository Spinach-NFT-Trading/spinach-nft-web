import {azureBlobClient} from '@spinach/common/controller/blob/const';
import {AzureBlobControlOpts} from '@spinach/common/controller/blob/type';
import {enforceAzureBlobNaming} from '@spinach/common/controller/blob/utils';


export const getBlobClient = async (opts: AzureBlobControlOpts) => {
  const enforcedOpts = enforceAzureBlobNaming(opts);
  const {container, name} = enforcedOpts;

  const containerClient = azureBlobClient.getContainerClient(container.toLowerCase());
  await containerClient.createIfNotExists();

  return {
    ...enforcedOpts,
    client: containerClient.getBlockBlobClient(name),
  };
};

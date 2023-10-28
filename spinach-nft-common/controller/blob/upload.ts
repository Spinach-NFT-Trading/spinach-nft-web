import {azureBlobClient} from '@spinach/common/controller/blob/const';


type UploadBlobOpts = {
  container: string,
  name: string,
  data: string,
};

export const uploadBlob = async ({container, name, data}: UploadBlobOpts) => {
  const containerClient = azureBlobClient.getContainerClient(container.toLowerCase());
  await containerClient.createIfNotExists();

  const blockBlobClient = containerClient.getBlockBlobClient(name);
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);

  console.log(`Uploaded blob to Azure`);
  console.log(`> Request ID: ${uploadBlobResponse.requestId}`);
  console.log(`> Container: ${container}`);
  console.log(`> Name: ${name}`);
};

import {getBlobClient} from '@spinach/common/controller/blob/client';
import {AzureBlobControlOpts} from '@spinach/common/controller/blob/type';


type UploadBlobOpts = AzureBlobControlOpts & {
  data: string,
};

export const uploadBlob = async ({data, ...opts}: UploadBlobOpts) => {
  const {client, container, name} = await getBlobClient(opts);
  const uploadBlobResponse = await client.upload(data, data.length);

  console.log(`Uploaded blob to Azure`);
  console.log(`> Request ID: ${uploadBlobResponse.requestId}`);
  console.log(`> Container: ${container}`);
  console.log(`> Name: ${name}`);
};

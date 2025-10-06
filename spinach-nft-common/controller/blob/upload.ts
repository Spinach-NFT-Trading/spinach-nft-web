import {getBlobClient} from '@spinach/common/controller/blob/client';
import {AzureBlobControlOpts} from '@spinach/common/controller/blob/type';


type UploadBlobBufferOpts = AzureBlobControlOpts & {
  buffer: Buffer,
  contentType: string,
};

export const uploadBlobBuffer = async ({buffer, contentType, ...opts}: UploadBlobBufferOpts) => {
  const {client, container, name} = await getBlobClient(opts);

  const uploadBlobResponse = await client.uploadData(
    buffer,
    {
      blobHTTPHeaders: {
        blobContentType: contentType,
      },
    },
  );

  console.log(`Uploaded buffer to Azure`);
  console.log(`> Request ID: ${uploadBlobResponse.requestId}`);
  console.log(`> Container: ${container}`);
  console.log(`> Name: ${name}`);
};

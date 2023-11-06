import {getBlobClient} from '@spinach/common/controller/blob/client';
import {AzureBlobControlOpts} from '@spinach/common/controller/blob/type';
import {BinaryData} from '@spinach/common/types/common/binary';


type UploadBlobOpts = AzureBlobControlOpts & BinaryData;

export const uploadBlob = async ({contentType, data, ...opts}: UploadBlobOpts) => {
  const {client, container, name} = await getBlobClient(opts);
  const dataArray = new Uint8Array(data);

  const uploadBlobResponse = await client.upload(
    dataArray,
    dataArray.byteLength,
    {
      blobHTTPHeaders: {
        blobContentType: contentType,
      },
    },
  );

  console.log(`Uploaded blob of type '${contentType}' to Azure`);
  console.log(`> Request ID: ${uploadBlobResponse.requestId}`);
  console.log(`> Container: ${container}`);
  console.log(`> Name: ${name}`);
};

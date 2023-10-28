import {getBlobClient} from '@spinach/common/controller/blob/client';
import {AzureBlobControlOpts} from '@spinach/common/controller/blob/type';


const streamToBuffer = async (readableStream: NodeJS.ReadableStream) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    readableStream.on('data', (data) => chunks.push(data instanceof Buffer ? data : Buffer.from(data)));
    readableStream.on('end', () => resolve(Buffer.concat(chunks)));
    readableStream.on('error', reject);
  });
};

export const getBlobBase64 = async (opts: AzureBlobControlOpts) => {
  const {client} = await getBlobClient(opts);

  const {readableStreamBody} = await client.download();
  if (!readableStreamBody) {
    return null;
  }

  return (await streamToBuffer(readableStreamBody)).toString('base64');
};

import {ByteArray} from '@spinach/common/types/common/binary';


export const byteArrayToDataUri = async (data: ByteArray) => {
  const array = new Uint8Array(data);

  return new Promise<string | null>((resolver) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;

      resolver(typeof result === 'string' ? result : null);
    };
    reader.readAsDataURL(new Blob([array]));
  });
};

export const streamToUint8Array = async (stream: NodeJS.ReadableStream): Promise<Uint8Array> => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on('data', (data) => chunks.push(data instanceof Buffer ? data : Buffer.from(data)));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
};

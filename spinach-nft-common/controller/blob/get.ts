import {getBlobClient} from '@spinach/common/controller/blob/client';
import {AzureBlobControlOpts} from '@spinach/common/controller/blob/type';
import {BinaryData} from '@spinach/common/types/common/binary';
import {streamToUint8Array} from '@spinach/common/utils/data';
import {isMimeTypesOfImage} from '@spinach/common/utils/mime';


export const getImageBlob = async (opts: AzureBlobControlOpts): Promise<BinaryData | null> => {
  const {client} = await getBlobClient(opts);

  if (!await client.exists()) {
    return null;
  }

  const {contentType, readableStreamBody} = await client.download();
  if (!readableStreamBody || !contentType || !isMimeTypesOfImage(contentType)) {
    return null;
  }

  return {
    contentType,
    data: Object.values(await streamToUint8Array(readableStreamBody)),
  };
};

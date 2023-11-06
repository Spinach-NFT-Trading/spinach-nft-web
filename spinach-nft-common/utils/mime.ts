import {MimeTypes, mimeTypesOfImage, MimeTypesOfImage} from '@spinach/common/types/common/mime';


export const isMimeTypesOfImage = (mimeType: string): mimeType is MimeTypesOfImage => {
  return mimeTypesOfImage.includes(mimeType as MimeTypes);
};

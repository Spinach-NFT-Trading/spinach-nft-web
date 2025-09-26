import {fileUploadFormFieldNames} from '@spinach/common/const/api';
import {apiPath} from '@spinach/common/const/path';
import {FileUploadResponse} from '@spinach/common/types/api/file/upload';

import {FileRef} from '@spinach/next/types/input/fileRef';


type UploadFileOpts = {
  fileRef: FileRef,
  grantId: string,
};

export const uploadFile = async ({
  fileRef,
  grantId,
}: UploadFileOpts): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append(fileUploadFormFieldNames.file, fileRef.file);
  formData.append(fileUploadFormFieldNames.grant, grantId);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}${apiPath.file.upload}`,
    {method: 'POST', body: formData},
  );

  return response.json();
};

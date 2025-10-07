import {ObjectId} from 'mongodb';

import {fileUploadGrantExpiryAfterActivatedSecs, fileUploadGrantExpirySecs} from '@spinach/common/const/fileUpload';
import {fileGrantCollection} from '@spinach/common/controller/collections/fileUpload';


export const generateFileUploadGrant = async (): Promise<string> => {
  const insertResult = await fileGrantCollection.insertOne({
    expiry: new Date(Date.now() + fileUploadGrantExpirySecs * 1000),
  });

  return insertResult.insertedId.toHexString();
};

export const activateFileUploadGrant = async (grantId: string) => {
  const updateResult = await fileGrantCollection.updateOne(
    {_id: new ObjectId(grantId)},
    {$set: {expiry: new Date(Date.now() + fileUploadGrantExpiryAfterActivatedSecs * 1000)}},
  );

  return updateResult.matchedCount === 1;
};

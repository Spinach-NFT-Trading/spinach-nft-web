import {Mongo} from '@spinach/common/controller/const';
import {FileUploadGrant} from '@spinach/common/types/data/fileUpload';


const db = Mongo.db('fileUpload');

export const fileGrantCollection = db.collection<FileUploadGrant>('grant');

const initDbIndex = () => {
  return fileGrantCollection.createIndex({expiry: 1}, {expireAfterSeconds: 0});
};

initDbIndex().catch((err) => console.error('Failed to init file upload collection index', err));

import * as env from 'env-var';


export const MongoUri = env.get('MONGODB_URI').required().asString();

export const azureBlobConnectionString = env.get('AZURE_BLOB_URI').required().asString();

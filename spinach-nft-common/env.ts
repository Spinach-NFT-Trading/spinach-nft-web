import * as env from 'env-var';


export const MongoUri = env.get('MONGODB_URI').required().asString();

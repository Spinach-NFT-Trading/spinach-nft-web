import {MongoClient} from 'mongodb';


declare global {
  const _mongoClientPromise: Promise<MongoClient>;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';

      MONGODB_URI: string;

      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;

      NEXT_PUBLIC_SERVER_API: string;
    }
  }
}

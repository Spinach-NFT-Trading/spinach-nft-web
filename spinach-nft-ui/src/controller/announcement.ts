import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {Announcement, announcementLevels} from '@/types/mongo/announcement';


const getCollection = async (): Promise<Collection<Announcement>> => {
  const client = await mongoPromise;

  return client
    .db('announcement')
    .collection<Announcement>('data');
};

export const getAllAnnouncements = async (): Promise<Announcement[]> => {
  return (await getCollection())
    .find({}, {sort: {order: -1}, projection: {_id: false}})
    .toArray();
};

const addAnnouncementDataValidation = async () => {
  // Needs to match the type of `Announcement`
  await (await mongoPromise)
    .db('announcement')
    .command({
      collMod: 'data',
      validator: {
        $jsonSchema: {
          required: ['_id', 'message', 'locale', 'level'],
          properties: {
            _id: {
              bsonType: 'objectId',
            },
            message: {
              bsonType: 'string',
            },
            level: {
              enum: announcementLevels,
            },
            expiry: {
              bsonType: 'date',
            },
            order: {
              bsonType: 'int',
            },
          },
          additionalProperties: false,
        },
      },
    });
};

const addAnnouncementDataIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({locale: 1}),
    collection.createIndex({expiry: 1}, {expireAfterSeconds: 0}),
    collection.createIndex({order: -1}),
  ]);
};

addAnnouncementDataValidation()
  .catch((e) => console.error('MongoDB failed to add announcement validation', e));
addAnnouncementDataIndex()
  .catch((e) => console.error('MongoDB failed to add announcement index', e));

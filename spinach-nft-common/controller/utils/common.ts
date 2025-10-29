import {Collection, Document, Filter, Sort, WithId} from 'mongodb';

import {Indexable} from '@spinach/common/types/common/typing';


export const getDataAsMap = async <TData extends Document>(
  collection: Collection<TData>,
  getKey: (data: WithId<TData>) => Indexable,
  filter?: Filter<TData>,
) => {
  return Object.fromEntries((await collection
    .find(filter ?? {}, {projection: {_id: false}})
    .toArray())
    .map((data) => [getKey(data), data]));
};

export const getDataAsArray = async <TData extends Document>(
  collection: Collection<TData>,
  filter?: Filter<TData>,
  sort?: Sort,
) => {
  return collection.find(filter ?? {}, {projection: {_id: false}, sort}).toArray();
};

export const getSingleData = async <TData extends Document>(
  collection: Collection<TData>,
  filter?: Filter<TData>,
) => {
  return collection.findOne(filter ?? {}, {projection: {_id: false}});
};

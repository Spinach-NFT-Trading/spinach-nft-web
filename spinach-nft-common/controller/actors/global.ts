import {defaultGlobalConfig} from '@spinach/common/const/global';
import {globalConfigCollection} from '@spinach/common/controller/collections/global';
import {GlobalConfig} from '@spinach/common/types/data/global';


export const getGlobalConfig = async (): Promise<GlobalConfig> => {
  const globalConfig = await globalConfigCollection.findOne(
    {},
    {projection: {_id: false}},
  );
  if (globalConfig) {
    return globalConfig;
  }

  // Using `updateOne` to make sure that there's no duplicated record
  await globalConfigCollection.updateOne({}, {$set: defaultGlobalConfig}, {upsert: true});
  return defaultGlobalConfig;
};

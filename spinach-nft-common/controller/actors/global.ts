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

  await globalConfigCollection.insertOne(defaultGlobalConfig);
  return defaultGlobalConfig;
};

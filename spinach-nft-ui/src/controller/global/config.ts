import {globalConfigCollection} from '@spinach/common/controller/collections/global';
import {GlobalConfig} from '@spinach/common/types/data/global';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {throwIfNotAdmin} from '@spinach/next/controller/utils';


type SetGlobalConfigOpts = ControllerRequireUserIdOpts & {
  config: GlobalConfig,
};

export const setGlobalConfig = async ({
  executorUserId,
  config,
}: SetGlobalConfigOpts): Promise<null> => {
  await throwIfNotAdmin(executorUserId);

  await globalConfigCollection.updateOne(
    {},
    {$set: config},
  );

  return null;
};

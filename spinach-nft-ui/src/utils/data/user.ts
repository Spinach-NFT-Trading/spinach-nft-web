import {UserInfo} from '@spinach/common/types/common/user';


export const formatUserName = ({username, name}: UserInfo) => `${name} (@${username})`;

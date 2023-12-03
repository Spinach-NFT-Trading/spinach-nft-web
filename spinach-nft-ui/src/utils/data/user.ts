import {UserInfo} from '@spinach/common/types/common/user';
import {UserBankDetails} from '@spinach/common/types/data/user/bank';


export const formatUserName = ({username, name}: UserInfo) => `${name} (@${username})`;

export const formatBankDetails = ({code, account}: UserBankDetails) => `${code}-${account}`;

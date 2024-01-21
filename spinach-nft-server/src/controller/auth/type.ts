import {UserModel} from '@spinach/common/types/data/user/data';
import {ObjectId} from 'mongodb';


export type RegisterUserResult = {
  model: UserModel,
  id: ObjectId,
};

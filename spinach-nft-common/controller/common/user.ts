import {ObjectId} from 'mongodb';

import {userBalanceCollection} from '@spinach/common/controller/collections/user';


export const getCurrentBalance = (userId: ObjectId) => userBalanceCollection.findOne({userId}, {sort: {_id: -1}});

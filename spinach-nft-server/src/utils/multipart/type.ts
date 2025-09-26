import {MultipartFields} from '@fastify/multipart';
import {ValueOf} from '@spinach/common/types/common/typing';


export type GetMultipartValueBaseOpts = {
  multipart: ValueOf<MultipartFields>,
};

import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';

import {FileRef} from '@spinach/next/types/input/fileRef';

// Value of `true` indicates completed
export type AccountVerificationUploadStatus = {[type in AccountIdVerificationType]: boolean};

export type AccountVerificationFileRefMap = {[type in AccountIdVerificationType]: FileRef | null};

import {CommonUserData} from '@spinach/next/types/auth';
import {AdminLookBackInputControl} from '@spinach/next/ui/admin/common/lookback/type';


export type AdminAgentRowCommonProps = {
  actor: CommonUserData,
  lookBackInputControl: AdminLookBackInputControl,
};

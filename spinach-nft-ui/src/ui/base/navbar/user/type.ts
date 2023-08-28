import {Session} from 'next-auth';


export type UserControlCommonProps = {
  session: Session | null,
};

import {Session} from 'next-auth';


export type PageLayoutProps = {
  announcement?: boolean,
  isValid?: (session: Session | null) => boolean,
  sessionOverride?: Session | null,
};

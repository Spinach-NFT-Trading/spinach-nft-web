import {TileLinkProps} from '@spinach/next/components/shared/link';


export type AdminLinkProps = TileLinkProps & {
  showsFor: {
    admin: boolean,
    agent: boolean,
  },
};

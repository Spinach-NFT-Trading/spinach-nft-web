import nextAuth from 'next-auth';

import {authOptions} from '@spinach/next/const/auth';


const handler = nextAuth(authOptions);

export {handler as GET, handler as POST};

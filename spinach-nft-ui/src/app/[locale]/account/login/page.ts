import {AccountLogin} from '@spinach/next/ui/account/login/main';
import {generatePageMeta} from '@spinach/next/utils/website/meta/main';


export const dynamic = 'force-dynamic';

export const generateMetadata = generatePageMeta({key: 'Account.Login.Title'});

export default AccountLogin;

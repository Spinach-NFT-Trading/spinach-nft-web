import {AccountRegister} from '@spinach/next/ui/account/register/main';
import {generatePageMeta} from '@spinach/next/utils/website/meta/main';


export const dynamic = 'force-dynamic';

export const generateMetadata = generatePageMeta({key: 'Account.Register.Title'});

export default AccountRegister;

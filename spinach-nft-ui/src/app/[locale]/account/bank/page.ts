import {AccountAddBank} from '@spinach/next/ui/account/bank/main';
import {generatePageMeta} from '@spinach/next/utils/website/meta/main';


export const dynamic = 'force-dynamic';

export const generateMetadata = generatePageMeta({key: 'Account.Bank.Title'});

export default AccountAddBank;

import {GoldExchange} from '@spinach/next/ui/gold/exchange/main';
import {generatePageMeta} from '@spinach/next/utils/website/meta/main';


export const dynamic = 'force-dynamic';

export const generateMetadata = generatePageMeta({key: 'Gold.Exchange.Title'});

export default GoldExchange;

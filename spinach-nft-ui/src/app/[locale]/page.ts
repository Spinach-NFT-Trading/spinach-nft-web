import {Home} from '@spinach/next/ui/home/main';
import {generatePageMeta} from '@spinach/next/utils/website/meta/main';


export const dynamic = 'force-dynamic';

export const generateMetadata = generatePageMeta({key: 'Home.Title'});

export default Home;

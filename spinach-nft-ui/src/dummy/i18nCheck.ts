// noinspection BadExpressionStatementJS

import {I18nMessage} from '@spinach/next/types/next/i18n';

/**
 * This file is intend to trigger typescript json schema check only, therefore no export should happen here.
 */
import enTranslations from '../../messages/ui/en.json';
import jaTranslations from '../../messages/ui/ja.json';
import thTranslations from '../../messages/ui/th.json';
import viTranslations from '../../messages/ui/vi.json';
import zhHansTranslations from '../../messages/ui/zh-Hans.json';
import zhHantTranslations from '../../messages/ui/zh-Hant.json';


zhHantTranslations satisfies I18nMessage['UI'];
zhHansTranslations satisfies I18nMessage['UI'];
enTranslations satisfies I18nMessage['UI'];
jaTranslations satisfies I18nMessage['UI'];
viTranslations satisfies I18nMessage['UI'];
thTranslations satisfies I18nMessage['UI'];

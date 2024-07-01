// Import is required to actually make the `IntlMessages` typing effective
// Therefore despite that `I18nContent` is just `string`, it's still importing stuff here
import {I18nContent} from '@spinach/next/types/i18n';


type I18nMetadata = {
  Title: string,
};

declare global {
  interface IntlMessages {
    Locale: I18nContent,
    UI: {},
  }
}

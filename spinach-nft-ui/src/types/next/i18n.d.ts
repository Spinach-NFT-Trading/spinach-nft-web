// Import is required to actually make the `IntlMessages` typing effective
// Therefore despite that `I18nContent` is just `string`, it's still importing stuff here
import {I18nContent} from '@spinach/next/types/i18n';


type I18nMetadata = {
  Title: string,
};

declare global {
  interface IntlMessages {
    Locale: I18nContent,
    UI: {
      Metadata: {
        Site: {
          Name: I18nContent,
          Description: I18nContent,
        },
        NotFound: I18nMetadata,
        Home: I18nMetadata,
        Account: {
          Index: I18nMetadata,
          Bank: I18nMetadata,
          Login: I18nMetadata,
          Nft: {
            Exchange: I18nMetadata,
            Position: I18nMetadata,
          },
          Profile: I18nMetadata,
          Register: I18nMetadata,
          Verify: {
            Id: I18nMetadata,
          },
        },
        Admin: I18nMetadata,
        Gold: {
          Confirm: {
            TwBank: I18nMetadata,
            Usdt: I18nMetadata,
          },
          Exchange: I18nMetadata,
        },
        Nft: {
          Purchase: I18nMetadata,
        },
      },
    },
  }
}

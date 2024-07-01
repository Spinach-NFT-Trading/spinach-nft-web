import {I18nPageMetadata} from '@spinach/next/types/i18n';


declare global {
  interface IntlMessages {
    Locale: string,
    UI: {
      Metadata: {
        Site: {
          Name: string,
          Description: string,
        },
        NotFound: I18nPageMetadata,
        Home: I18nPageMetadata,
        Account: {
          Index: I18nPageMetadata,
          Bank: I18nPageMetadata,
          Login: I18nPageMetadata,
          Nft: {
            Exchange: I18nPageMetadata,
            Position: I18nPageMetadata,
          },
          Profile: I18nPageMetadata,
          Register: I18nPageMetadata,
          Verify: {
            Id: I18nPageMetadata,
          },
        },
        Admin: I18nPageMetadata,
        Gold: {
          Confirm: {
            TwBank: I18nPageMetadata,
            Usdt: I18nPageMetadata,
          },
          Exchange: I18nPageMetadata,
        },
        Nft: {
          Purchase: I18nPageMetadata,
        },
      },
      InPage: {
        Account: {
          Bank: {
            Error: {
              MissingBankbookPhoto: string,
              IncorrectFileType: string,
            },
            InputField: {
              BankbookPhoto: string,
              BankCode: string,
              BankAccount: string,
            },
            Upload: string,
            Uploading: string,
          },
          Login: {
            Account: string,
            Password: string,
          },
          Nft: {
            Exchange: {
              Popup: {
                Title: string,
                Message: string,
                Button: string,
              }
            },
          },
          Profile: {
            ReferralLink: string,
            ResubmitIdentityVerification: string,
            NoAssociatedBankAccounts: string,
            AddBankAccount: string,
          },
        },
        Nft: {
          Purchase: {
            Error: {
              NotOnSale: string,
              NotFound: string,
            },
            Info: {
              Id: string,
              OnSaleTimestamp: string,
              Description: string,
              Price: string,
            },
            Buy: string,
            Popup: {
              Title: string,
              Message: string,
              Button: string,
            },
            Disclaimer: {
              Title: string,
              Content: string,
            },
          },
        },
      },
      Account: {
        Info: {
          UserId: string,
          Email: string,
          LineId: string,
          WalletAddress: string,
          Name: string,
          IdentificationNumber: string,
          Birthday: string,
        },
        BankAccounts: {
          Name: string,
          Code: string,
          Account: string,
        },
      }
      UserControl: {
        Login: string,
        Logout: string,
        Register: string,
      },
    },
  }
}

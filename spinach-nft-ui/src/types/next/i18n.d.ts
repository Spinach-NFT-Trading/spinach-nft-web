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
      Component: {
        AccountIdVerificationForm: {
          Uploading: string,
        },
      },
      InPage: {
        Home: {
          PrivacyPolicy: string,
          Stats: {
            NftVolume: string,
            UsdtVolume: string,
            GoldVolume: string,
          },
          Pledge: {
            System: {
              Title: string,
              Content: string,
            },
            Security: {
              Title: string,
              Content: string,
            },
            Legitimacy: {
              Title: string,
              Content: string,
            },
            Customize: {
              Title: string,
              Content: string,
            },
          },
        },
        Account: {
          Bank: {
            Error: {
              MissingBankbookPhoto: string,
            },
            InputField: {
              BankbookPhoto: string,
              BankCode: string,
              BankAccount: string,
            },
            Upload: string,
            Uploading: string,
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
          Register: {
            Sms: {
              Verification: {
                Code: string,
                GetCode: string,
                Submit: string,
              },
            },
            Info: {
              ClickForWalletCreation: string,
            },
            Completed: {
              Message: string,
              KYC: string,
            },
            NextStep: string,
            AlreadyHaveAnAccount: string,
          },
          Verify: {
            Id: {
              Submit: string,
            },
          },
          Index: {
            Profile: string,
            NftPositions: string,
            NftExchangeConfirm: string,
            Admin: string,
          },
        },
        Gold: {
          Exchange: {
            CurrencyRate: string,
            Cashback: string,
            Buy: string,
            Tutorial: {
              CreateMaxAccount: string,
              BuyUsdt: string,
              CheckWalletAddress: string,
            },
            Popup: {
              Title: string,
              Message: string,
              Button: string,
            },
          },
          Confirm: {
            Layout: {
              Type: string,
              Amount: string,
            },
            TwBank: {
              Error: {
                SelectWiringSource: string,
                AttachProof: string,
                InvalidAmount: string,
              },
              Message: {
                UploadCompleted: string,
              },
              Field: {
                WiringSource: string,
                WiringProof: string,
              },
              UploadStatus: {
                Waiting: string,
                Processing: string,
                Completed: string,
                Failed: string,
              },
            },
            Usdt: {
              Field: {
                Chain: string,
                Address: string,
              },
              Message: {
                UsdtOnly: string,
              },
              Note: {
                NoOtherThanUsdt: string,
                SecureDevice: string,
                NoOtherContracts: string,
              },
            },
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
      Layout: {
        Profile: {
          BuyGold: string,
        },
      },
      Account: {
        Assets: {
          Nft: string,
          Gold: string,
          Total: string,
        },
        Info: {
          UserId: string,
          Email: string,
          LineId: string,
          WalletAddress: string,
          Name: string,
          IdentificationNumber: string,
          Birthday: string,
          Phone: string,
        },
        BankAccounts: {
          Name: string,
          Code: string,
          Account: string,
        },
        IdType: {
          IdFront: string,
          IdBack: string,
          Handheld: string,
          SecondaryFront: string,
        },
      },
      Gold: {
        ExchangeChannel: {
          Usdt: string,
          Twd: string,
        },
      },
      VerificationStatus: {
        Verified: string,
        Unverified: string,
        Rejected: string,
      },
      UserControl: {
        Credentials: {
          Account: string,
          Password: string,
        },
        Login: string,
        Logout: string,
        Register: string,
      },
      Error: {
        Api: {
          AccountNotFound: string,
          AccountDisabled: string,
          AgentNotFound: string,
          AgentInactive: string,
          PasswordMismatch: string,
          TakenIdNumber: string,
          TakenUsername: string,
          TakenName: string,
          TakenEmail: string,
          TakenLineId: string,
          TakenWallet: string,
          GoldExchangeInProgress: string,
          GoldNotEnough: string,
          GoldTwBankTxnRecordFailed: string,
          GoldTwBankTxnNotFound: string,
          NftNotOnSale: string,
          NftInfoNotFound: string,
          NftMatchRequestNotFound: string,
          WalletInvalid: string,
          WalletNotExist: string,
          SmsAlreadyRequested: string,
          SmsSendFailed: string,
          SmsPhoneInvalid: string,
          SmsPhoneUsed: string,
          SmsPhoneRegistered: string,
          SmsCodeInvalid: string,
          IdNumberInvalid: string,
          BankDetailsAlreadyExist: string,
          BankDetailsUploadFailed: string,
          BankDetailsNotFound: string,
          CommissionOverLimit: string,
        },
        Input: {
          IncorrectFileType: string,
        },
      },
    },
  }
}

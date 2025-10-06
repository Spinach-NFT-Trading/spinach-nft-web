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
        Admin: {
          Tabs: {
            Agents: string,
            Members: string,
            ExchangeRequests: string,
            VerifyId: string,
            VerifyBankAccount: string,
            VerifyBankTxn: string,
            GlobalConfig: string,
          },
          Common: {
            LookBack: {
              StartDate: string,
              EndDate: string,
              Today: string,
              Yesterday: string,
              ThisWeek: string,
              ThisMonth: string,
              LastMonth: string,
            },
            Commission: {
              Buy: string,
              Sell: string,
            },
            Summary: {
              TotalBalance: string,
              TotalNftBought: string,
              TotalNftSold: string,
              TotalDepositedUsdt: string,
              TotalDepositedTwd: string,
            },
            NoAgent: string,
          },
          Agents: {
            Title: string,
            Header: {
              UserName: string,
              TotalBalance: string,
              TotalNftBought: string,
              TotalNftSold: string,
              DepositedTwd: string,
              DepositedUsdt: string,
              CashbackSettings: {
                Agent: string,
                Member: string,
              },
            },
            LowerLevels: string,
            Search: {
              IdNumber: string,
              Username: string,
              Name: string,
            },
          },
          GlobalConfig: {
            RequestToken: string,
            Updated: string,
            Deleted: string,
            Cashback: {
              Twd: string,
              Usdt: string,
              ThirdParty: string
            }
          },
          ExchangeRequest: {
            Tabs: {
              Queued: string,
              Matched: string,
              Completed: string,
            },
            Header: {
              RequestId: string,
              TimePassed: string,
              Amount: string,
              AmountRequested: string,
              AmountActual: string,
              AmountToRefund: string,
              SourceToken: string,
              BankAccount: string,
            },
            LastUpdated: string,
          },
          Members: {
            Title: string,
            Control: {
              Toggle: {
                Agent: string,
                Normal: string,
                Suspended: string,
              },
              AccountInfo: string,
              BankDetails: string,
              TxnHistory: string,
              BalanceHistory: string,
              ManualAdjust: string,
            },
            Header: {
              UserId: string,
              VerificationStatus: string,
              Agent: string,
              Status: string,
              CurrentBalance: string,
              NftBought: string,
              NftSold: string,
              DepositedTwd: string,
              DepositedUsdt: string,
              Cashback: string,
              CashbackSettings: {
                Agent: string,
                Member: string,
              },
            },
            Info: {
              Id: string,
              IdNumber: string,
              Username: string,
              Name: string,
              Email: string,
              Birthday: string,
              LineId: string,
              Wallet: string,
              Recruiter: string,
            },
            Popup: {
              Balance: {
                Daily: {
                  Header: {
                    Date: string,
                    EodBalance: string,
                  },
                  Content: {
                    Loading: string,
                    NoResult: string,
                  },
                  Details: string,
                },
                Details: {
                  Header: {
                    Time: string,
                    Type: string,
                    Amount: string,
                    Balance: string,
                  },
                  Content: {
                    Loading: string,
                    NoResult: string,
                  },
                },
              },
              NftTxn: {
                Header: {
                  Time: string,
                  NftId: string,
                  Counterparty: string,
                },
                Content: {
                  Loading: string,
                  NoResult: string,
                },
                Sell: string,
                Buy: string,
              },
              ManualAdjust: {
                Balance: string,
              },
            },
            Message: {
              NoAssociatedBanks: string,
            },
          },
          VerifyInfo: {
            Title: {
              Bank: string,
              GoldPurchase: string,
              PendingAccount: string,
            },
            Bank: {
              BankbookCover: string,
            },
            GoldTxn: {
              TxnRecord: string,
              SourceBankCode: string,
              SourceBankAccount: string,
              TargetWallet: string,
              Amount: string,
            },
            Info: {
              IdNumber: string,
              Username: string,
              Name: string,
              Birthday: string,
              Email: string,
              LineId: string,
              BankAccount: string,
              Wallet: string,
            }
          },
        },
      },
      Layout: {
        Nav: {
          PositionSold: string,
        },
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
          User: string,
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
      User: {
        Balance: {
          HistoryType: {
            NftBuy: string,
            NftSell: string,
            NftSellRefund: string,
            NftBuyCommissionMember: string,
            NftBuyCommissionAgent: string,
            NftSellCommissionMember: string,
            NftSellCommissionAgent: string,
            DepositTwd: string,
            DepositTwdCashback: string,
            DepositCrypto: string,
            DepositCryptoCashback: string,
            AdminAdjustment: string,
          },
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
          MultipartEmptyBody: string,
          MultipartFieldEmpty: string,
          MultipartFieldNotFile: string,
          MultipartFieldNotValue: string,
          MultipartFieldValueCastFailed: string,
          MultipartTooManyFiles: string,
          MultipartTooManyValues: string,
          FileUploadGrantActivationFailed: string,
          FileUploadMissingFile: string,
          FileUploadMissingContentType: string,
        },
        Input: {
          IncorrectFileType: string,
        },
      },
    },
  }
}

import React from 'react';

import {BankDetails} from '@spinach/common/types/data/user/bank';
import {translateApiError} from '@spinach/common/utils/translate/apiError';
import clsx from 'clsx';
import {signIn} from 'next-auth/react';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {InputFileImageOnly} from '@spinach/next/components/shared/common/input/file/image';
import {HorizontalSplitter} from '@spinach/next/components/shared/common/splitter';
import {VerificationStatusUi} from '@spinach/next/components/shared/common/verified';
import {getVerificationStatusTextStyleMap} from '@spinach/next/const/verification';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {getToggleButtonClass} from '@spinach/next/styles/input';
import {GoldExchangeConfirmSection} from '@spinach/next/ui/gold/confirm/common/section';
import {GoldExchangeConfirmTwBankClientCommonProps} from '@spinach/next/ui/gold/confirm/twBank/client/type';
import {goldExchangeTwBankInitialInput, goldExchangeUploadStatus} from '@spinach/next/ui/gold/confirm/twBank/const';
import {GoldExchangeConfirmTwBankInput} from '@spinach/next/ui/gold/confirm/twBank/type';
import {formatBankDetails} from '@spinach/next/utils/data/user';


type Props = GoldExchangeConfirmTwBankClientCommonProps & {
  verifiedBankDetails: BankDetails[],
};

export const GoldExchangeConfirmTwBankLoadedClient = ({wallet, amount, verifiedBankDetails}: Props) => {
  const {code, account} = wallet;
  const [input, setInput] = React.useState<GoldExchangeConfirmTwBankInput>(
    goldExchangeTwBankInitialInput,
  );

  const {act, status} = useUserDataActor({
    statusNoReset: true,
  });

  const {
    errorMessage,
    sourceBankDetailsUuid,
    txnProofImage,
  } = input;

  const onSubmit = async () => {
    if (!act) {
      await signIn();
      return;
    }

    if (!sourceBankDetailsUuid) {
      setInput((original): GoldExchangeConfirmTwBankInput => ({
        ...original,
        errorMessage: '請選擇轉帳來源帳號。',
      }));
      return;
    }

    if (!txnProofImage) {
      setInput((original): GoldExchangeConfirmTwBankInput => ({
        ...original,
        errorMessage: '請附上轉帳紀錄圖片。',
      }));
      return;
    }

    if (!amount) {
      setInput((original): GoldExchangeConfirmTwBankInput => ({
        ...original,
        errorMessage: '無效的轉帳金額。',
      }));
      return;
    }

    const session = await act({
      action: 'request',
      options: {
        type: 'exchange.gold.twBank',
        data: {
          sourceBankDetailsUuid,
          txnProofImage,
          targetWalletId: wallet.id,
          amount,
        },
      },
    });
    const error = session?.user.jwtUpdateError;
    if (!error) {
      setInput(goldExchangeTwBankInitialInput);
      return;
    }

    setInput((original): GoldExchangeConfirmTwBankInput => ({
      ...original,
      errorMessage: translateApiError(error),
    }));
  };

  return (
    <FlexForm onSubmit={onSubmit} className="gap-1.5">
      <GoldExchangeConfirmSection title="銀行代碼" content={code}/>
      <GoldExchangeConfirmSection title="銀行帳號" content={account}/>
      <HorizontalSplitter/>
      {errorMessage && <Alert>{translateApiError(errorMessage)}</Alert>}
      <AnimatedCollapse show={status === 'completed'}>
        <Flex center>
          轉帳資料上傳完成。
        </Flex>
      </AnimatedCollapse>
      <AnimatedCollapse appear show={status !== 'completed'}>
        <Flex className="gap-1.5">
          <GoldExchangeConfirmSection
            title="轉帳來源"
            content={
              <Flex className="gap-1">
                {
                  !input.sourceBankDetailsUuid &&
                  <Flex center className="text-rose-400">
                    請選擇轉帳來源。
                  </Flex>
                }
                {verifiedBankDetails.map((bankDetails) => {
                  const isActive = sourceBankDetailsUuid === bankDetails.uuid;

                  return (
                    <FlexButton
                      key={bankDetails.uuid}
                      className={clsx(
                        'group gap-1 p-1',
                        getToggleButtonClass(isActive),
                        getVerificationStatusTextStyleMap(isActive)[bankDetails.status],
                      )}
                      onClick={() => setInput((original) => ({
                        ...original,
                        sourceBankDetailsUuid: bankDetails.uuid,
                      } satisfies GoldExchangeConfirmTwBankInput))}
                    >
                      <VerificationStatusUi status={bankDetails.status} isActive={isActive}/>
                      <div>{formatBankDetails(bankDetails)}</div>
                    </FlexButton>
                  );
                })}
              </Flex>
            }
          />
          <InputFileImageOnly
            id="transactionProof"
            title="銀行轉帳證明"
            onFileSelected={(txnProofImage) => setInput((original) => ({
              ...original,
              txnProofImage,
            } satisfies GoldExchangeConfirmTwBankInput))}
            onFileTypeIncorrect={(type) => setInput((original) => ({
              ...original,
              errorMessage: `檔案種類不正確: ${type}`,
            } satisfies GoldExchangeConfirmTwBankInput))}
            required
          />
          <button
            type="submit"
            className="enabled:button-clickable-bg disabled:button-disabled p-2"
            disabled={status === 'processing' || !sourceBankDetailsUuid || !txnProofImage}
          >
            {goldExchangeUploadStatus[status]}
          </button>
        </Flex>
      </AnimatedCollapse>
    </FlexForm>
  );
};

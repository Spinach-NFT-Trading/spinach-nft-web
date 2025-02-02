import React from 'react';

import {
  lineIdPattern,
  namePattern,
  passwordPattern,
  usernamePattern,
  walletPattern,
} from '@spinach/common/const/auth';
import {idNumberPattern} from '@spinach/common/const/id';
import {IsoDateString} from '@spinach/common/types/common/date';
import {useTranslations} from 'next-intl';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
import {AccountRegisterCommonProps, AccountRegisterInput} from '@spinach/next/ui/account/register/type';


export const AccountRegisterBasicInfo = ({show, input, setInput, onComplete}: AccountRegisterCommonProps) => {
  const {
    idNumber,
    name,
    email,
    birthday,
    lineId,
    wallet,
    username,
    password,
  } = input;

  const t = useTranslations('UI.Account');
  const t2 = useTranslations('UI.InPage.Account.Register');
  const t3 = useTranslations('UI.UserControl');

  return (
    <AnimatedCollapse show={show}>
      <FlexForm className="gap-2" onSubmit={onComplete}>
        <InputFloatingLabel
          id="idNumber"
          placeholder={t('Info.IdentificationNumber')}
          type="text"
          value={idNumber}
          onChange={({target}) => setInput((original) => ({
            ...original,
            idNumber: target.value,
          } satisfies AccountRegisterInput))}
          required
          pattern={idNumberPattern}
        />
        <InputFloatingLabel
          id="name"
          placeholder={t('Info.Name')}
          type="text"
          value={name}
          onChange={({target}) => setInput((original) => ({
            ...original,
            name: target.value,
          } satisfies AccountRegisterInput))}
          autoComplete="name"
          required
          pattern={namePattern}
        />
        <InputFloatingLabel
          id="email"
          placeholder={t('Info.Email')}
          type="email"
          value={email}
          onChange={({target}) => setInput((original) => ({
            ...original,
            email: target.value,
          } satisfies AccountRegisterInput))}
          autoComplete="email"
          required
        />
        <InputFloatingLabel
          id="birthday"
          placeholder={t('Info.Birthday')}
          type="date"
          value={birthday}
          onChange={({target}) => setInput((original) => ({
            ...original,
            birthday: target.value as IsoDateString,
          } satisfies AccountRegisterInput))}
          required
        />
        <InputFloatingLabel
          id="lineId"
          placeholder={t('Info.LineId')}
          type="text"
          value={lineId}
          onChange={({target}) => setInput((original) => ({
            ...original,
            lineId: target.value,
          } satisfies AccountRegisterInput))}
          required
          pattern={lineIdPattern}
        />
        <InputFloatingLabel
          id="wallet"
          placeholder={t('Info.WalletAddress')}
          type="text"
          value={wallet}
          onChange={({target}) => setInput((original) => ({
            ...original,
            wallet: target.value,
          } satisfies AccountRegisterInput))}
          pattern={walletPattern}
        />
        <a href="https://youtu.be/bkCavlothfY" target="_blank" className="text-link w-fit self-end text-sm">
          {t2('Info.ClickForWalletCreation')}
        </a>
        <InputFloatingLabel
          id="username"
          placeholder={t3('Credentials.Account')}
          type="text"
          value={username}
          onChange={({target}) => setInput((original) => ({
            ...original,
            username: target.value,
          } satisfies AccountRegisterInput))}
          autoComplete="username"
          required
          pattern={usernamePattern}
        />
        <InputFloatingLabel
          id="password"
          placeholder={t3('Credentials.Password')}
          type="password"
          value={password}
          onChange={({target}) => setInput((original) => ({
            ...original,
            password: target.value,
          } satisfies AccountRegisterInput))}
          autoComplete="new-password"
          required
          pattern={passwordPattern}
        />
        <button type="submit" className="button-clickable-bg w-full p-2">
          {t2('NextStep')}
        </button>
      </FlexForm>
    </AnimatedCollapse>
  );
};

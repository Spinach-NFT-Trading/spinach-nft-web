import {MessageKeys, NamespaceKeys, NestedKeyOf, NestedValueOf} from 'next-intl';

import {I18nMessage} from '@spinach/next/types/next/i18n';


export type I18nNamespaces = NamespaceKeys<I18nMessage, NestedKeyOf<I18nMessage>>;

type I18nMessageKeysOfObject<TMessageObject> = MessageKeys<TMessageObject, NestedKeyOf<TMessageObject>>;

type I18nNamespaceObject<TNamespace extends I18nNamespaces> = NestedValueOf<
  {'!': I18nMessage},
  [TNamespace] extends [never] ? '!' : `!.${TNamespace}`
>;

export type I18nMessageKeysOfNamespace<
  TNamespace extends I18nNamespaces
> = I18nMessageKeysOfObject<I18nNamespaceObject<TNamespace>>;

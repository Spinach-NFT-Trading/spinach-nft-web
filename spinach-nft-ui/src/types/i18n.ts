import {MessageKeys, NamespaceKeys, NestedKeyOf, NestedValueOf} from 'next-intl';


export type I18nNamespaces = NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>>;

type I18nMessageKeysOfObject<TMessageObject> = MessageKeys<TMessageObject, NestedKeyOf<TMessageObject>>;

type I18nNamespaceObject<TNamespace extends I18nNamespaces> = NestedValueOf<
  {'!': IntlMessages},
  [TNamespace] extends [never] ? '!' : `!.${TNamespace}`
>;

export type I18nMessageKeysOfNamespace<
  TNamespace extends I18nNamespaces
> = I18nMessageKeysOfObject<I18nNamespaceObject<TNamespace>>;

export type I18nContent = string;

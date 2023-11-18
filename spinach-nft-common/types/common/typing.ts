export type KeysOfType<T, KT> = {
  [K in keyof T]: T[K] extends KT ? K : never
}[keyof T];

export type Indexable = number | string | symbol;

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Nullable<T> = T | null | undefined;

export type NullableRecord<T> = {[K in keyof T]: Nullable<T[K]>};

export type NonNullableRecord<T> = {[K in keyof T]: NonNullable<T[K]>};

export type DeepPartial<T> = T extends object ? {[P in keyof T]?: DeepPartial<T[P]>} : T;

export type DeepPartialExceptKey<T> = T extends object ? {[P in keyof T]: DeepPartial<T[P]> | undefined} : T;

export type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

export const isNotNullish = <TValue>(value: TValue | null | undefined): value is TValue => {
  if (value === null || value === undefined) {
    return false;
  }

  // noinspection BadExpressionStatementJS
  value satisfies TValue;
  return true;
};

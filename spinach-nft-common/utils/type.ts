export const isNotNullish = <TValue>(value: TValue | null | undefined): value is TValue => {
  if (value === null || value === undefined) {
    return false;
  }

  // noinspection BadExpressionStatementJS
  value satisfies TValue;
  return true;
};
